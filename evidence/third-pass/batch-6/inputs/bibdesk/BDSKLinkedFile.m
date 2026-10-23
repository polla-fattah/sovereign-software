//
//  BDSKLinkedFile.m
//  Bibdesk
//
//  Created by Christiaan Hofman on 11/12/07.
/*
 This software is Copyright (c) 2007
 Christiaan Hofman. All rights reserved.
 
 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions
 are met:
 
 - Redistributions of source code must retain the above copyright
 notice, this list of conditions and the following disclaimer.
 
 - Redistributions in binary form must reproduce the above copyright
 notice, this list of conditions and the following disclaimer in
 the documentation and/or other materials provided with the
 distribution.
 
 - Neither the name of Christiaan Hofman nor the names of any
 contributors may be used to endorse or promote products derived
 from this software without specific prior written permission.
 
 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

#import "BDSKLinkedFile.h"
#import <CoreServices/CoreServices.h>
#import "BDSKRuntime.h"
#import "NSString_BDSKExtensions.h"
#import "NSURL_BDSKExtensions.h"
#import "BDSKComplexString.h"
#import <FileView/FileView.h>

#define BDSKSaveLinkedFilesAsRelativePathOnlyKey @"BDSKSaveLinkedFilesAsRelativePathOnly"
#define BDSKSaveLinkedFilesAsArchivedDataKey @"BDSKSaveLinkedFilesAsArchivedData"
#define BDSKSaveLinkedFilesAsAliasKey @"BDSKSaveLinkedFilesAsAlias"

// this is the base64 encoding of "bplist", which is always the start of a binary property list
#define ENCODED_PLIST_PREFIX @"YnBsaXN0"

#define ALIASDATA_KEY @"aliasData"
#define BOOKMARK_KEY @"bookmark"
#define RELATIVEPATH_KEY @"relativePath"
#define URL_KEY @"URL"

static inline NSURL *BDSKURLFromFSRef(const FSRef *inRef);
static inline BOOL BDSKPathToFSRef(NSString *inPath, FSRef *outRef);
static inline NSDictionary *BDSKDictionaryFromData(NSData *data);

#pragma mark -

@interface BDSKAlias : NSObject {
    AliasHandle alias;
}
+ (instancetype)aliasWithData:(NSData *)data;
+ (instancetype)aliasWithFSRef:(const FSRef *)aRef baseRef:(const FSRef *)baseRef;
+ (instancetype)aliasWithPath:(NSString *)path basePath:(NSString *)basePath;
- (BOOL)getFSRef:(FSRef *)outRef baseRef:(const FSRef *)baseRef shouldUpdate:(BOOL *)shouldUpdate;
- (void)updateWithFSRef:(const FSRef *)aRef baseRef:(const FSRef *)baseRef;
@property (nonatomic, readonly) NSData *data;
@end

#pragma mark -

// Private placeholder subclass

@interface BDSKPlaceholderLinkedFile : BDSKLinkedFile
@end

#pragma mark -

// Private concrete subclasses

@interface BDSKLinkedAliasFile : BDSKLinkedFile {
    id alias; // can be a BDSKAlias or bookmark NSData
    NSString *relativePath;
    NSURL *fileURL;
    BOOL isInitial;
    BOOL hasSkimNotes;
    BOOL hasSkimNotesNeedsUpdate;
    __weak id delegate;
}
- (void)updateFileURL;
- (NSData *)dataRelativeToPath:(NSString *)newBasePath isBookmark:(BOOL *)isBookmark;
@end

#pragma mark -

@interface BDSKAliasLinkedFile : BDSKLinkedAliasFile {
    const FSRef *fileRef;
}
- (void)updateFileRef;
@end

#pragma mark -

@interface BDSKBookmarkLinkedFile : BDSKLinkedAliasFile {
    NSURL *fileRefURL;
}
@end

#pragma mark -

@interface BDSKLinkedURL : BDSKLinkedFile {
    NSURL *URL;
}
@end

#pragma mark -

// Abstract superclass

@implementation BDSKLinkedFile

@dynamic URL, file, displayURL, path, stringValue, bibTeXString, relativePath, delegate, hasSkimNotes;

static Class BDSKLinkedFileClass = Nil;
static Class BDSKConcreteLinkedAliasFileClass = Nil;
static BOOL saveRelativePathOnly = NO;
static BOOL saveArchivedData = NO;

+ (void)initialize {
    BDSKINITIALIZE;
    BDSKLinkedFileClass = self;
    saveRelativePathOnly = [[NSUserDefaults standardUserDefaults] boolForKey:BDSKSaveLinkedFilesAsRelativePathOnlyKey];
    saveArchivedData = [[NSUserDefaults standardUserDefaults] boolForKey:BDSKSaveLinkedFilesAsArchivedDataKey];
    
    NSString *fileClassName = (saveArchivedData || [[NSUserDefaults standardUserDefaults] boolForKey:BDSKSaveLinkedFilesAsAliasKey]) ? @"BDSKAliasLinkedFile" : @"BDSKBookmarkLinkedFile";
    BDSKConcreteLinkedAliasFileClass = NSClassFromString(fileClassName);
    [NSKeyedUnarchiver setClass:BDSKConcreteLinkedAliasFileClass forClassName:@"BDSKLinkedAliasFile"];
    [NSKeyedArchiver setClassName:@"BDSKLinkedAliasFile" forClass:BDSKConcreteLinkedAliasFileClass];
}

+ (instancetype)allocWithZone:(NSZone *)aZone {
    if (BDSKLinkedFileClass == self) {
        static BDSKPlaceholderLinkedFile *defaultPlaceholderLinkedFile = nil;
        static dispatch_once_t onceToken = 0;
        dispatch_once(&onceToken, ^{
            defaultPlaceholderLinkedFile = [BDSKPlaceholderLinkedFile alloc];
        });
        return defaultPlaceholderLinkedFile;
    } else {
        return [super allocWithZone:aZone];
    }
}

+ (instancetype)linkedFileWithURL:(NSURL *)aURL delegate:(id<BDSKLinkedFileDelegate>)aDelegate {
    return [[self alloc] initWithURL:aURL delegate:aDelegate];
}

+ (instancetype)linkedFileWithBase64String:(NSString *)base64String delegate:(id<BDSKLinkedFileDelegate>)aDelegate {
    return [[self alloc] initWithBase64String:base64String delegate:aDelegate];
}

+ (instancetype)linkedFileWithURLString:(NSString *)aString {
    return [[self alloc] initWithURLString:aString];
}

- (instancetype)initWithURL:(NSURL *)aURL delegate:(id<BDSKLinkedFileDelegate>)aDelegate {
    BDSKRequestConcreteImplementation(self, _cmd);
    return nil;
}

- (instancetype)initWithBase64String:(NSString *)base64String delegate:(id<BDSKLinkedFileDelegate>)aDelegate {
    BDSKRequestConcreteImplementation(self, _cmd);
    return nil;
}

- (instancetype)initWithURLString:(NSString *)aString {
    BDSKRequestConcreteImplementation(self, _cmd);
    return nil;
}

- (id)copyWithZone:(NSZone *)aZone {
    BDSKRequestConcreteImplementation(self, _cmd);
    return nil;
}

- (instancetype)initWithCoder:(NSCoder *)coder {
    BDSKRequestConcreteImplementation(self, _cmd);
    return nil;
}

- (void)encodeWithCoder:(NSCoder *)coder {
    BDSKRequestConcreteImplementation(self, _cmd);
}

+ (BOOL)supportsSecureCoding { return YES; }

- (NSString *)description {
    return [NSString stringWithFormat:@"<%@: URL=%@>", [self class], [self URL]];
}

- (NSURL *)URL {
    BDSKRequestConcreteImplementation(self, _cmd);
    return nil;
}

- (NSURL *)displayURL {
    return [self URL];
}

- (NSString *)path {
    return [[self URL] path];
}

- (NSString *)stringRelativeToPath:(NSString *)newBasePath {
    BDSKRequestConcreteImplementation(self, _cmd);
    return nil;
}

- (BOOL)isFile { return NO; }

- (BOOL)hasSkimNotes { return NO; }

- (void)updateWithPath:(NSString *)aPath {}

- (void)updateHasSkimNotes {}

- (NSString *)relativePath { return nil; }

- (void)setDelegate:(id<BDSKLinkedFileDelegate>)aDelegate {}
- (id<BDSKLinkedFileDelegate>)delegate { return nil; }

- (NSString *)stringValue {
    return [[self URL] absoluteString];
}

- (NSString *)bibTeXString {
    return [[self stringRelativeToPath:nil] stringAsBibTeXString];
}

// for templating
- (id)valueForUndefinedKey:(NSString *)key {
    return [[self URL] valueForKey:key];
}

@end

#pragma mark -

@implementation BDSKPlaceholderLinkedFile

- (id)init {
    return nil;
}

- (id)initWithURL:(NSURL *)aURL delegate:(id<BDSKLinkedFileDelegate>)aDelegate {
    if([aURL isFileURL])
        return (id)[[BDSKConcreteLinkedAliasFileClass alloc] initWithURL:aURL delegate:aDelegate];
    else if (aURL)
        return (id)[[BDSKLinkedURL alloc] initWithURL:aURL delegate:aDelegate];
    else
        return nil;
}

- (id)initWithBase64String:(NSString *)base64String delegate:(id<BDSKLinkedFileDelegate>)aDelegate {
    return (id)[[BDSKConcreteLinkedAliasFileClass alloc] initWithBase64String:base64String delegate:aDelegate];
}

- (id)initWithURLString:(NSString *)aString {
    return (id)[[BDSKLinkedURL alloc] initWithURLString:aString];
}

- (id)initWithCoder:(NSCoder *)coder {
    if ([coder containsValueForKey:URL_KEY])
        return (id)[[BDSKLinkedURL alloc] initWithCoder:coder];
    else
        return (id)[[BDSKConcreteLinkedAliasFileClass alloc] initWithCoder:coder];
}

@end

#pragma mark -

// Alias- and FSRef-based concrete subclass for local files

@implementation BDSKLinkedAliasFile

static Class BDSKLinkedAliasFileClass = Nil;

+ (void)initialize {
    BDSKINITIALIZE;
    BDSKLinkedAliasFileClass = self;
}

- (instancetype)initWithAlias:(id)anAlias relativePath:(NSString *)relPath delegate:(id<BDSKLinkedFileDelegate>)aDelegate {
    BDSKASSERT(nil != anAlias || nil != relPath);
    BDSKASSERT(nil == aDelegate || [aDelegate respondsToSelector:@selector(basePathForLinkedFile:)]);
    
    if (anAlias == nil && relPath == nil) {
        self = nil;
    } else {
        self = [super init];
        if (self) {
            alias = anAlias;
            relativePath = [relPath copy];
            delegate = aDelegate;
            fileURL = nil;
            isInitial = YES;
            hasSkimNotes = NO;
            hasSkimNotesNeedsUpdate = YES;
        }
    }
    return self;
}

- (instancetype)initWithURL:(NSURL *)aURL delegate:(id<BDSKLinkedFileDelegate>)aDelegate {
    BDSKASSERT([aURL isFileURL]);
    
    NSString *aPath = [aURL path];
    
    BDSKASSERT(nil != aPath);
    
    NSString *basePath = [aDelegate basePathForLinkedFile:self];
    NSString *relPath = basePath ? [aPath relativePathFromPath:basePath] : nil;
    NSData *anAlias = [aURL bookmarkDataWithOptions:0 includingResourceValuesForKeys:nil relativeToURL:nil error:NULL];
    self = [self initWithAlias:anAlias relativePath:relPath delegate:aDelegate];
    if (self && basePath)
        [self updateFileURL];
    return self;
}

- (instancetype)initWithBase64String:(NSString *)base64String delegate:(id<BDSKLinkedFileDelegate>)aDelegate {
    BDSKASSERT(nil != base64String);
    
    NSMutableString *tmpString = nil;
    
    if ([base64String rangeOfCharacterFromSet:[NSCharacterSet whitespaceAndNewlineCharacterSet]].location != NSNotFound) {
        // make a valid base64 string: remove newline and white space characters if necessary
        tmpString = [base64String mutableCopy];
        [tmpString replaceOccurrencesOfCharactersInSet:[NSCharacterSet whitespaceAndNewlineCharacterSet] withString:@""];
        if ([tmpString hasPrefix:ENCODED_PLIST_PREFIX])
            base64String = tmpString;
        else
            tmpString = nil;
    }
    
    NSString *relPath = nil;
    id anAlias = nil;
    
    if ([base64String hasPrefix:ENCODED_PLIST_PREFIX]) {
        if (([base64String length] % 4) != 0) {
            // add padding "=" if necessary, reuse tmpString if possible
            if (tmpString == nil)
                tmpString = [base64String mutableCopy];
            while (([tmpString length] % 4) != 0)
                [tmpString appendString:@"="];
            base64String = tmpString;
        }
        
        NSData *data = nil;
        @try {
            data = [[NSData alloc] initWithBase64EncodedString:base64String options:NSDataBase64DecodingIgnoreUnknownCharacters];
        }
        @catch(id exception) {
            data = nil;
            NSLog(@"Ignoring exception \"%@\" while getting data from base 64 string.", exception);
        }
        if (data) {
            NSDictionary *dictionary = BDSKDictionaryFromData(data);
            anAlias = [dictionary objectForKey:BOOKMARK_KEY] ?: [BDSKAlias aliasWithData:[dictionary objectForKey:ALIASDATA_KEY]];
            relPath = [dictionary objectForKey:RELATIVEPATH_KEY];
        }
    } else {
        relPath = base64String;
    }
    
    self = [self initWithAlias:anAlias relativePath:relPath delegate:aDelegate];
    return self;
}

- (instancetype)initWithURLString:(NSString *)aString {
    BDSKASSERT_NOT_REACHED("Attempt to initialize BDSKLinkedAliasFile with a URL string");
    return nil;
}

- (instancetype)initWithCoder:(NSCoder *)coder {
    if ([self isMemberOfClass:BDSKLinkedAliasFileClass]) {
        BDSKASSERT_NOT_REACHED("Attempt to decode a BDSKLinkedAliasFile instance");
        self = [BDSKConcreteLinkedAliasFileClass alloc];
    }
    id anAlias = [coder containsValueForKey:BOOKMARK_KEY] ? [coder decodeObjectOfClass:[NSData class] forKey:BOOKMARK_KEY] : [BDSKAlias aliasWithData:[coder decodeObjectOfClass:[NSData class] forKey:ALIASDATA_KEY]];
    NSString *relPath = [coder decodeObjectOfClass:[NSString class] forKey:RELATIVEPATH_KEY];;
    self = [self initWithAlias:anAlias relativePath:relPath delegate:nil];
    return self;
}

- (void)encodeWithCoder:(NSCoder *)coder {
    // make sure the fileRef is valid
    [self updateFileURL];
    BOOL isBookmark = NO;
    NSData *data = [self dataRelativeToPath:[delegate basePathForLinkedFile:self] isBookmark:&isBookmark];
    [coder encodeObject:relativePath forKey:RELATIVEPATH_KEY];
    [coder encodeObject:data forKey:isBookmark ? BOOKMARK_KEY : ALIASDATA_KEY];
}

+ (BOOL)supportsSecureCoding { return YES; }

- (instancetype)copyWithZone:(NSZone *)aZone {
    // make sure the fileRef is valid
    [self updateFileURL];
    BOOL isBookmark = NO;
    NSData *data = [self dataRelativeToPath:[delegate basePathForLinkedFile:self] isBookmark:&isBookmark];
    id anAlias = nil;
    if (data) {
        if (isBookmark) {
            anAlias = data;
        } else {
            anAlias = [BDSKAlias aliasWithData:data];
            if (anAlias == nil && [alias isKindOfClass:[NSData class]])
                anAlias = alias;
        }
    }
    id copy = [[[self class] alloc] initWithAlias:anAlias relativePath:relativePath delegate:nil];
    return copy;
}

// Should we implement -isEqual: and -hash?

- (NSString *)stringValue {
    return [self path] ?: @"";
}

- (BOOL)isFile {
    return YES;
}

- (id<BDSKLinkedFileDelegate>)delegate {
    return delegate;
}

- (void)setDelegate:(id<BDSKLinkedFileDelegate>)newDelegate {
    BDSKASSERT(nil == newDelegate || [newDelegate respondsToSelector:@selector(basePathForLinkedFile:)]);
    
    delegate = newDelegate;
}

- (NSString *)relativePath {
    return relativePath;
}

- (void)setRelativePath:(NSString *)path fromPath:(NSString *)basePath {
    relativePath = [path relativePathFromPath:basePath];
}

- (void)setFileURL:(NSURL *)aURL {
    if (aURL != fileURL) {
        fileURL = aURL;
        hasSkimNotesNeedsUpdate = YES;
        if (isInitial == NO)
            [delegate performSelector:@selector(linkedFileURLChanged:) withObject:self afterDelay:0.0];
    }
}

- (NSURL *)URL {
    [self updateFileURL];
    return fileURL;
}

- (NSURL *)displayURL {
    NSURL *displayURL = [self URL];
    if (displayURL == nil && relativePath) {
        NSString *basePath = [delegate basePathForLinkedFile:self];
        if (basePath)
            displayURL = [[FVFileView missingFileURLWithPath:[basePath stringByAppendingPathComponent:relativePath]] standardizedURL];
        else
            displayURL = [FVFileView missingFileURLWithPath:relativePath];
    }
    return displayURL;
}

- (BOOL)hasSkimNotes {
    if (hasSkimNotesNeedsUpdate) {
        hasSkimNotes = [[fileURL SkimNotes] count] > 0;
        hasSkimNotesNeedsUpdate = NO;
    }
    return hasSkimNotes;
}

- (void)updateHasSkimNotes {
    hasSkimNotesNeedsUpdate = YES;
    if (isInitial == NO)
        [delegate performSelector:@selector(linkedFileURLChanged:) withObject:self afterDelay:0.0];
}

- (NSString *)stringRelativeToPath:(NSString *)newBasePath {
    BOOL noAlias = saveRelativePathOnly && newBasePath != nil;
    if (newBasePath == nil)
        newBasePath = [delegate basePathForLinkedFile:self];
    NSDictionary *dictionary  = nil;
    // this will make sure the fileURL is valid
    NSString *path = [self path];
    path = path && newBasePath ? [path relativePathFromPath:newBasePath] : relativePath;
    if (noAlias == NO || path == nil) {
        BOOL isBookmark = NO;
        NSData *data = [self dataRelativeToPath:newBasePath isBookmark:&isBookmark];
        if (data) {
            dictionary = [NSDictionary dictionaryWithObjectsAndKeys:data, (isBookmark ? BOOKMARK_KEY : ALIASDATA_KEY), path, RELATIVEPATH_KEY, nil];
        }
    }
    if (dictionary == nil)
        dictionary = [NSDictionary dictionaryWithObjectsAndKeys:path, RELATIVEPATH_KEY, nil];
    if (saveArchivedData)
        return [[NSKeyedArchiver archivedDataWithRootObject:dictionary requiringSecureCoding:YES error:NULL] base64EncodedStringWithOptions:0];
    else
        return [[NSPropertyListSerialization dataWithPropertyList:dictionary format:NSPropertyListBinaryFormat_v1_0 options:0 error:NULL] base64EncodedStringWithOptions:0];
}

// implemented by the subclasses
- (NSData *)dataRelativeToPath:(NSString *)newBasePath isBookmark:(BOOL *)isBookmark { return nil; }

// implemented by the subclasses
- (void)updateFileURL {}

// This is called when the file is added (new or initially),
// the document URL changes, or with aPath != nil after an autofile
// implemented by the subclasses
- (void)updateWithPath:(NSString *)aPath {}

@end

#pragma mark -

@implementation BDSKAliasLinkedFile

- (instancetype)initWithURL:(NSURL *)aURL delegate:(id<BDSKLinkedFileDelegate>)aDelegate {
    BDSKASSERT([aURL isFileURL]);
    
    NSString *aPath = [aURL path];
    
    BDSKASSERT(nil != aPath);
    
    NSString *basePath = [aDelegate basePathForLinkedFile:self];
    NSString *relPath = basePath ? [aPath relativePathFromPath:basePath] : nil;
    BDSKAlias *anAlias = [BDSKAlias aliasWithPath:aPath basePath:basePath];
    self = [self initWithAlias:anAlias relativePath:relPath delegate:aDelegate];
    if (self && basePath)
        [self updateFileRef];
    return self;
}

// always encode subclasses as BDSKLinkedAliasFile
// it will warn when this is merely inherited from a superclass
- (Class)classForCoder { return BDSKLinkedAliasFileClass; }
- (Class)classForArchiver { return BDSKLinkedAliasFileClass; }
- (Class)classForKeyedArchiver { return BDSKLinkedAliasFileClass; }

- (void)dealloc {
    if (fileRef) free((void *)fileRef);
    fileRef = NULL;
}

- (void)setFileRef:(FSRef *)aRef {
    if (fileRef) {
        free((void *)fileRef);
        fileRef = NULL;
    }
    if (aRef != NULL) {
        FSRef *newRef = (FSRef *)malloc(sizeof(FSRef));
        if (newRef) {
            bcopy(aRef, newRef, sizeof(FSRef));
            fileRef = newRef;
        }
    }
}

- (void)updateAliasWithBaseRef:(FSRef *)baseRef {
    BDSKASSERT(fileRef != NULL);
    BDSKASSERT(baseRef != NULL);
    
    // update the alias
    if ([alias isKindOfClass:[BDSKAlias class]]) {
        [alias updateWithFSRef:fileRef baseRef:baseRef];
    } else {
        BDSKAlias *anAlias = [BDSKAlias aliasWithFSRef:fileRef baseRef:baseRef];
        if (anAlias) {
            alias = anAlias;
        }
    }
}

- (void)updateFileRef {
    NSString *basePath = [delegate basePathForLinkedFile:self];
    BOOL shouldUpdate = NO;
    
    FSRef baseRef;
    BOOL hasBaseRef = BDSKPathToFSRef(basePath, &baseRef);
    
    if (fileRef == nil) {
        FSRef aRef;
        BOOL hasRef = NO;
        
        if (fileURL) {
            hasRef = BDSKPathToFSRef([fileURL path], &aRef);
            shouldUpdate = hasBaseRef && hasRef;
        }
        
        if (hasRef == NO && hasBaseRef && relativePath) {
            NSString *path = [relativePath isAbsolutePath] ? relativePath : [basePath stringByAppendingPathComponent:relativePath];
            shouldUpdate = hasRef = BDSKPathToFSRef(path, &aRef);
        }
        
        if (hasRef == NO) {
            if ([alias isKindOfClass:[BDSKAlias class]]) {
                hasRef = [alias getFSRef:&aRef baseRef:hasBaseRef ? &baseRef : NULL shouldUpdate:&shouldUpdate];
                shouldUpdate = (shouldUpdate || relativePath == nil) && hasBaseRef && hasRef;
            } else if ([alias isKindOfClass:[NSData class]]) {
                NSURL *aURL = [[NSURL alloc] initByResolvingBookmarkData:alias options:NSURLBookmarkResolutionWithoutUI | NSURLBookmarkResolutionWithoutMounting relativeToURL:nil bookmarkDataIsStale:NULL error:NULL];
                hasRef = BDSKPathToFSRef([aURL path], &aRef);
                shouldUpdate = hasBaseRef && hasRef;
            }
        }
        
        if (hasRef) {
            [self setFileRef:&aRef];
        }
    } else if (relativePath == nil) {
        shouldUpdate = hasBaseRef;
    }
    
    if ((shouldUpdate || fileURL == nil) && fileRef != nil) {
        NSURL *aURL = BDSKURLFromFSRef(fileRef);
        if (aURL != nil) {
            if (fileURL == nil)
                fileURL = aURL;
            if (shouldUpdate) {
                [self updateAliasWithBaseRef:&baseRef];
                [self setRelativePath:[aURL path] fromPath:basePath];
            }
        }
    }
}

- (void)updateFileURL {
    BOOL hadFileURL = fileURL != nil;
    NSURL *aURL = nil;
    
    if (fileRef != nil) {
        aURL = BDSKURLFromFSRef(fileRef);
        if (aURL == nil && fileRef) {
            // fileRef was invalid, try to update it
            free((void *)fileRef);
            fileRef = NULL;
        }
    }
    if (aURL == nil) {
        // fileRef was nil or invalid
        [self updateFileRef];
        aURL = BDSKURLFromFSRef(fileRef);
    }
    
    if ([aURL isEqual:fileURL] == NO && (aURL != nil || hadFileURL)) {
        FSRef aRef;
        if (BDSKPathToFSRef([fileURL path], &aRef)) {
            // the file was replaced, reference the replacement rather than the moved file
            // this is what Dropbox does with file updates
            [self setFileRef:&aRef];
            aURL = BDSKURLFromFSRef(fileRef);
            NSString *basePath = [delegate basePathForLinkedFile:self];
            FSRef baseRef;
            if (BDSKPathToFSRef(basePath, &baseRef)) {
                [self updateAliasWithBaseRef:&baseRef];
                [self setRelativePath:[aURL path] fromPath:basePath];
            }
        }
        [self setFileURL:aURL];
    }
}

- (void)safelySetAlias:(BDSKAlias *)anAlias {
    if (anAlias != nil) {
        id saveAlias = alias;
        alias = anAlias;
        [self updateFileRef];
        if (fileRef == nil) {
            alias = saveAlias;
            [self updateFileRef];
        }
    }
}

// This is called when the file is added (new or initially),
// the document URL changes, or with aPath != nil after an autofile
- (void)updateWithPath:(NSString *)aPath {
    NSString *basePath = [delegate basePathForLinkedFile:self];
    
    if (fileRef == nil) {
        // this does the updating if possible
        [self updateFileRef];
    } else {
        NSURL *aURL = BDSKURLFromFSRef(fileRef);
        if (aURL != nil) {
            // if the path has changed, updating will be done below
            if (basePath && (aPath == nil || [[aURL path] isEqualToString:aPath])) {
                FSRef baseRef;
                if (BDSKPathToFSRef(basePath, &baseRef)) {
                    [self updateAliasWithBaseRef:&baseRef];
                    [self setRelativePath:[aURL path] fromPath:basePath];
                }
            }
        } else {
            // the fileRef was invalid, reset it and update
            if (fileRef) {
                free((void *)fileRef);
                fileRef = NULL;
            }
            [self updateFileRef];
            if (fileRef == nil && aPath) {
                // this can happen after an auto file to a volume, as the file is actually not moved but copied
                [self safelySetAlias:[BDSKAlias aliasWithPath:aPath basePath:basePath]];
                if (basePath)
                    [self setRelativePath:aPath fromPath:basePath];
            }
        }
    }
    if (aPath) {
        NSString *path = [self path];
        if ([path isEqualToString:aPath] == NO) {
            BOOL needsUpdate = YES;
            FSRef aRef;
            if (BDSKPathToFSRef(aPath, &aRef)) {
                NSURL *aURL = BDSKURLFromFSRef(&aRef);
                if ([path isEqualToString:[aURL path]]) {
                    needsUpdate = NO;
                } else {
                    [self setFileRef:&aRef];
                    [self setFileURL:aURL];
                }
            }
            if (needsUpdate) {
                FSRef baseRef;
                if (BDSKPathToFSRef(basePath, &baseRef)) {
                    [self updateAliasWithBaseRef:&baseRef];
                    [self setRelativePath:aPath fromPath:basePath];
                } else {
                    [self safelySetAlias:[BDSKAlias aliasWithPath:aPath basePath:basePath]];
                }
            }
        }
    }
    isInitial = NO;
}

- (NSData *)dataRelativeToPath:(NSString *)newBasePath isBookmark:(BOOL *)isBookmark {
    BDSKAlias *anAlias = NULL;
    if (fileRef) {
        FSRef baseRef;
        BOOL hasBaseRef = BDSKPathToFSRef(newBasePath, &baseRef);
        anAlias = [BDSKAlias aliasWithFSRef:fileRef baseRef:hasBaseRef ? &baseRef : NULL];
    } else if (relativePath && newBasePath) {
        NSString *path = [relativePath isAbsolutePath] ? relativePath : [[newBasePath stringByAppendingPathComponent:relativePath] stringByStandardizingPath];
        anAlias = [BDSKAlias aliasWithPath:path basePath:newBasePath];
    }
    
    NSData *data = nil;
    if (anAlias) {
        data = [anAlias data];
        *isBookmark = NO;
    } else if ([alias isKindOfClass:[BDSKAlias class]]) {
        data = [alias data];
        *isBookmark = NO;
    } else if ([alias isKindOfClass:[NSData class]]) {
        data = alias;
        *isBookmark = YES;
    }
    return data;
}

@end

#pragma mark -

@implementation BDSKBookmarkLinkedFile

// always encode subclasses as BDSKLinkedAliasFile
// it will warn when this is merely inherited from a superclass
- (Class)classForCoder { return BDSKLinkedAliasFileClass; }
- (Class)classForArchiver { return BDSKLinkedAliasFileClass; }
- (Class)classForKeyedArchiver { return BDSKLinkedAliasFileClass; }

- (void)updateFileURL {
    NSString *basePath = nil;
    BOOL shouldUpdate = NO;
    NSURL *aURL = nil;
    NSURL *refURL = nil;
    
    if (fileURL) {
        refURL = [fileURL fileReferenceURL];
        
        if (refURL == nil) {
            // fileURL was invalid, try to update it
            fileURL = nil;
        } else if ([fileRefURL isEqual:refURL] == NO) {
            // file was replaced
            fileRefURL = refURL;
            hasSkimNotesNeedsUpdate = YES;
            if (isInitial)
                [delegate linkedFileURLChanged:self];
            basePath = [delegate basePathForLinkedFile:self];
            shouldUpdate = YES;
        } else {
            refURL = nil;
            if (relativePath == nil) {
                basePath = [delegate basePathForLinkedFile:self];
                shouldUpdate = YES;
            }
        }
    }
    
    if (fileURL == nil) {
        
        if (fileRefURL) {
            aURL = [fileRefURL filePathURL];
            shouldUpdate = aURL != nil;
        }
        
        basePath = [delegate basePathForLinkedFile:self];
        
        if (aURL == nil && basePath && relativePath) {
            aURL = [[NSURL alloc] initFileURLWithPath:[relativePath isAbsolutePath] ? relativePath : [basePath stringByAppendingPathComponent:relativePath] isDirectory:NO];
            refURL = [aURL fileReferenceURL];
            aURL = [refURL filePathURL];
            shouldUpdate = refURL != nil;
        }
        
        if (refURL == nil && [alias isKindOfClass:[NSData class]]) {
            aURL = [[NSURL alloc] initByResolvingBookmarkData:alias options:NSURLBookmarkResolutionWithoutUI | NSURLBookmarkResolutionWithoutMounting relativeToURL:nil bookmarkDataIsStale:&shouldUpdate error:NULL];
            if (aURL)
                refURL = [aURL fileReferenceURL];
            shouldUpdate = shouldUpdate && aURL != nil;
        } else if (aURL == nil && [alias isKindOfClass:[BDSKAlias class]]) {
            FSRef aRef, baseRef;
            BOOL ignored, hasBaseRef = BDSKPathToFSRef(basePath, &baseRef);
            if ([alias getFSRef:&aRef baseRef:hasBaseRef ? &baseRef : NULL shouldUpdate:&ignored]){
                aURL = BDSKURLFromFSRef(&aRef);
                if (aURL)
                    refURL = [aURL fileReferenceURL];
            }
            shouldUpdate = aURL != nil;
        }
        
        if (aURL) {
            [self setFileURL:aURL];
            if (refURL) {
                fileRefURL = refURL;
            }
        } else {
            fileRefURL = nil;
        }
    }
    
    if (shouldUpdate) {
        NSData *data = [(fileURL ?: [fileRefURL filePathURL])  bookmarkDataWithOptions:0 includingResourceValuesForKeys:nil relativeToURL:nil error:NULL];
        if (data) {
            alias = data;
        }
        if (basePath)
            [self setRelativePath:[fileURL path] fromPath:basePath];
    }
}

// This is called when the file is added (new or initially),
// the document URL changes, or with aPath != nil after an autofile
- (void)updateWithPath:(NSString *)aPath {
    NSString *basePath = [delegate basePathForLinkedFile:self];
    
    if (aPath) {
        // this implicitly calls updateFileURL
        NSString *path = [self path];
        if ([path isEqualToString:aPath] == NO) {
            // this can happen when auto filing to a different volume, which copies the file
            BOOL needsUpdate = YES;
            NSURL *refURL = [[NSURL fileURLWithPath:aPath] fileReferenceURL];
            if (refURL) {
                NSURL *aURL = [refURL filePathURL];
                if ([path isEqualToString:[aURL path]]) {
                    refURL = nil;
                    needsUpdate = NO;
                } else {
                    fileRefURL = refURL;
                    [self setFileURL:aURL];
                }
            }
            if (needsUpdate) {
                NSData *data = [(fileURL ?: [fileRefURL filePathURL])  bookmarkDataWithOptions:0 includingResourceValuesForKeys:nil relativeToURL:nil error:NULL];
                if (data) {
                    alias = data;
                }
                if (basePath)
                    [self setRelativePath:aPath fromPath:basePath];
            }
        }
    } else {
        // this does the updating of the bookmark and URLs if needed
        [self updateFileURL];
        if (fileURL && basePath) {
            // the basePath may have changed, which may be noted by updateFileURL
            [self setRelativePath:[fileURL path] fromPath:basePath];
        }
    }
    isInitial = NO;
}

- (NSData *)dataRelativeToPath:(NSString *)newBasePath isBookmark:(BOOL *)isBookmark {
    NSData *data = nil;
    
    if (fileURL) {
        data = [fileURL  bookmarkDataWithOptions:0 includingResourceValuesForKeys:nil relativeToURL:nil error:NULL];
    } else if (relativePath && newBasePath) {
        NSURL *aURL = [NSURL fileURLWithPath:[relativePath isAbsolutePath] ? relativePath : [[newBasePath stringByAppendingPathComponent:relativePath] stringByStandardizingPath]];
        data = [aURL bookmarkDataWithOptions:0 includingResourceValuesForKeys:nil relativeToURL:nil error:NULL];
    }
    
    if (data) {
        *isBookmark = YES;
    } else if ([alias isKindOfClass:[NSData class]]) {
        data = alias;
        *isBookmark = YES;
    } else if ([alias isKindOfClass:[BDSKAlias class]]) {
        data = [alias data];
        *isBookmark = NO;
    }
    return data;
}

@end

#pragma mark -

// URL based concrete subclass for remote URLs

@implementation BDSKLinkedURL

- (instancetype)initWithURL:(NSURL *)aURL delegate:(id<BDSKLinkedFileDelegate>)aDelegate {
    self = [super init];
    if (self) {
        if (aURL) {
            URL = [aURL copy];
        } else {
            self = nil;
        }
            
    }
    return self;
}

- (instancetype)initWithURLString:(NSString *)aString {
    return [self initWithURL:[NSURL URLWithString:aString] delegate:nil];
}

- (instancetype)initWithBase64String:(NSString *)base64String delegate:(id<BDSKLinkedFileDelegate>)aDelegate {
    BDSKASSERT_NOT_REACHED("Attempt to initialize BDSKLinkedURL with a base 64 string");
    return nil;
}

- (id)copyWithZone:(NSZone *)aZone {
    return [[[self class] alloc] initWithURL:URL delegate:nil];
}

- (instancetype)initWithCoder:(NSCoder *)coder {
    self = [super init];
    if (self) {
        URL = [coder decodeObjectOfClass:[NSURL class] forKey:URL_KEY];
    }
    return self;
}

- (void)encodeWithCoder:(NSCoder *)coder {
    [coder encodeObject:URL forKey:URL_KEY];
}

+ (BOOL)supportsSecureCoding { return YES; }

- (NSURL *)URL {
    return URL;
}

- (NSString *)stringRelativeToPath:(NSString *)newBasePath {
    return [URL absoluteString];
}

@end

#pragma mark -

// File reference functions

#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wdeprecated-declarations"

static inline NSURL *BDSKURLFromFSRef(const FSRef *inRef) {
    return inRef == NULL ? nil : CFBridgingRelease(CFURLCreateFromFSRef(NULL, inRef));
}

static const FSRef *BDSKBaseRefIfOnSameVolume(const FSRef *inBaseRef, const FSRef *inRef) {
    FSCatalogInfo baseCatalogInfo, catalogInfo;
    BOOL sameVolume = NO;
    if (inBaseRef != NULL && inRef != NULL &&
        noErr == FSGetCatalogInfo(inBaseRef, kFSCatInfoVolume, &baseCatalogInfo, NULL, NULL, NULL) &&
        noErr == FSGetCatalogInfo(inRef, kFSCatInfoVolume, &catalogInfo, NULL, NULL, NULL))
        sameVolume = baseCatalogInfo.volume == catalogInfo.volume;
    return sameVolume ? inBaseRef : NULL;
}

static inline BOOL BDSKPathToFSRef(NSString *inPath, FSRef *outRef) {
    OSStatus err = fnfErr;
    
    if (inPath != nil)
        err = FSPathMakeRefWithOptions((UInt8 *)[inPath fileSystemRepresentation], kFSPathMakeRefDoNotFollowLeafSymlink, outRef, NULL);
    
    return noErr == err;
}

#pragma clang diagnostic pop

static NSDictionary *BDSKDictionaryFromPlistData(NSData *data) {
    NSDictionary *dictionary = [NSPropertyListSerialization propertyListWithData:data options:NSPropertyListImmutable format:NULL error:NULL];
    if ([dictionary isKindOfClass:[NSDictionary class]] == NO)
        return nil;
    if ([dictionary objectForKey:@"$archiver"])
        return nil;
    return dictionary;
}

static NSDictionary *BDSKDictionaryFromArchivedData(NSData *data) {
    NSDictionary *dictionary = [NSKeyedUnarchiver unarchivedObjectOfClasses:[NSSet setWithObjects:[NSDictionary class], [NSString class], [NSData class], nil] fromData:data error:NULL];
    if ([dictionary isKindOfClass:[NSDictionary class]] == NO)
        return nil;
    return dictionary;
}

static inline NSDictionary *BDSKDictionaryFromData(NSData *data) {
    if (saveArchivedData)
        return BDSKDictionaryFromArchivedData(data) ?: BDSKDictionaryFromPlistData(data);
    else
        return BDSKDictionaryFromPlistData(data) ?: BDSKDictionaryFromArchivedData(data);
}

#pragma mark -

@implementation BDSKAlias

@dynamic data;

- (instancetype)initWithAliasHandle:(AliasHandle)handle {
    self = [super init];
    if (self) {
        alias = (AliasHandle)handle;
    }
    return self;
}

+ (instancetype)aliasWithPath:(NSString *)path basePath:(NSString *)basePath {
    FSRef ref, baseRef;
    
    if (BDSKPathToFSRef(path, &ref) &&
        (basePath == nil || BDSKPathToFSRef(basePath, &baseRef)))
        return [self aliasWithFSRef:&ref baseRef:&baseRef];
    return nil;
}

#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wdeprecated-declarations"

+ (instancetype)aliasWithData:(NSData *)data {
    CFIndex len;
    Handle handle = NULL;
    
    if (data != nil) {
        len = CFDataGetLength((__bridge CFDataRef)data);
        handle = NewHandle(len);
        
        if ((handle != NULL) && (len > 0)) {
            HLock(handle);
            memmove((void *)*handle, (const void *)CFDataGetBytePtr((__bridge CFDataRef)data), len);
            HUnlock(handle);
        }
    }
    
    return handle == NULL ? nil : [[self alloc] initWithAliasHandle:(AliasHandle)handle];
}

+ (instancetype)aliasWithFSRef:(const FSRef *)aRef baseRef:(const FSRef *)baseRef {
    OSStatus err = noErr;
    AliasHandle handle = NULL;
    
    err = FSNewAlias(BDSKBaseRefIfOnSameVolume(baseRef, aRef), aRef, &handle);
    
    if (err != noErr && handle != NULL) {
        DisposeHandle((Handle)handle);
        handle = NULL;
    }
    
    return handle == NULL ? nil : [[self alloc] initWithAliasHandle:(AliasHandle)handle];
}

- (void)dealloc {
    if (alias != NULL) {
        DisposeHandle((Handle)alias);
        alias = NULL;
    }
}

- (BOOL)getFSRef:(FSRef *)outRef baseRef:(const FSRef *)baseRef shouldUpdate:(BOOL *)shouldUpdate {
    OSStatus err = noErr;
    short aliasCount = 1;
    
    // it would be preferable to search the (relative) path before the fileID, but than links to symlinks will always be resolved to the target
    err = FSMatchAliasBulk(baseRef, kARMNoUI | kARMSearch | kARMSearchRelFirst | kARMTryFileIDFirst, alias, &aliasCount, outRef, (Boolean *)shouldUpdate, NULL, NULL);
    
    return noErr == err;
}

- (NSData *)data {
    Handle handle = (Handle)alias;
    CFDataRef data = NULL;
    CFIndex len;
    SInt8 handleState;
    
    if (handle != NULL) {
        len = GetHandleSize(handle);
        handleState = HGetState(handle);
        
        HLock(handle);
        
        data = CFDataCreate(kCFAllocatorDefault, (const UInt8 *) *handle, len);
        
        HSetState(handle, handleState);
    }
    return CFBridgingRelease(data);
}

- (void)updateWithFSRef:(const FSRef *)aRef baseRef:(const FSRef *)baseRef {
    Boolean didUpdate;
    FSUpdateAlias(BDSKBaseRefIfOnSameVolume(baseRef, aRef), aRef, alias, &didUpdate);
}

#pragma clang diagnostic pop

@end
