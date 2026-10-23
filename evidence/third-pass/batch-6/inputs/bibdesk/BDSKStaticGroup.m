//
//  BDSKStaticGroup.m
//  Bibdesk
//
//  Created by Christiaan Hofman on 10/21/06.
/*
 This software is Copyright (c) 2005
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

#import "BDSKStaticGroup.h"
#import "BDSKStringConstants.h"
#import "NSString_BDSKExtensions.h"
#import "NSImage_BDSKExtensions.h"
#import "BibItem.h"
#import "BibDocument.h"
#import "BibDocument_Groups.h"
#import "BDSKOwnerProtocol.h"
#import "BDSKPublicationsArray.h"


@implementation BDSKStaticGroup

@synthesize publications;

// designated initializer
- (instancetype)initWithName:(NSString *)aName publications:(NSArray *)array {
    self = [super initWithName:aName];
    if (self) {
        publications = [[NSMutableArray alloc] initWithArray:array];
        [self setCount:[array count]];
    }
    return self;
}

// super's designated initializer
- (instancetype)initWithName:(NSString *)aName {
    self = [self initWithName:aName publications:nil];
    return self;
}

- (instancetype)initWithDictionary:(NSDictionary *)groupDict {
    NSString *aName = [[groupDict objectForKey:@"group name"] stringByUnescapingGroupPlistEntities];
    NSArray *keys = [[groupDict objectForKey:@"keys"] componentsSeparatedByString:@","];
    self = [self initWithName:aName publications:nil];
    if (self) {
        tmpKeys = keys;
        [self setCount:[tmpKeys count]];
    }
    return self;
}

- (NSDictionary *)dictionaryValue {
    NSString *aName = [[[self name] description] stringByEscapingGroupPlistEntities];
    NSMutableArray *keys = [NSMutableArray arrayWithArray:tmpKeys];
    if (tmpKeys == nil) {
        for (BibItem *item in [self publications]) {
            NSString *aKey = [item citeKey];
            if ([keys containsObject:aKey] == NO)
                [keys addObject:aKey];
        }
    }
    return [NSDictionary dictionaryWithObjectsAndKeys:aName, @"group name", [keys componentsJoinedByString:@","], @"keys", nil];
}

// we don't really care about the publications for unarchoving, as we only use NSSecureCoding to remember group selection
- (instancetype)initWithCoder:(NSCoder *)decoder {
    self = [super initWithCoder:decoder];
    if (self) {
        publications = [[NSMutableArray alloc] init];
    }
    return self;
}

+ (BOOL)supportsSecureCoding { return YES; }

- (id)copyWithZone:(NSZone *)aZone {
	return [[[self class] alloc] initWithName:name publications:publications];
}

- (void)dealloc {
    // should always be on the main thread, see BibDocument, but be sure
    BDSKENSURE_MAIN_THREAD( [[self undoManager] removeAllActionsWithTarget:self]; );
}

- (NSUInteger)equivalenceHash {
    return [[self name] hash];
}

- (BOOL)isEquivalent:(id)other {
	if (self == other)
		return YES;
	if (NO == [other isMemberOfClass:[self class]]) 
		return NO;
	if (NO == [[self name] isEqual:[other name]])
        return NO;
    return [self count] == [(BDSKGroup *)other count];
}

- (NSImage *)icon {
    static NSImage *icon = nil;
    if (icon == nil) {
        NSImage *image = [NSImage imageNamed:NSImageNameFolder];
        icon = [[NSImage alloc] initSmallBitmapWithDrawingHandler:^(NSRect rect){
            [image drawInRect:rect fromRect:NSZeroRect operation:NSCompositingOperationCopy fraction:1.0];
        }];
        [icon setAccessibilityDescription:NSLocalizedString(@"static group", @"Accessibility description")];
    }
    return icon;
}

- (BDSKGroupType)groupType { return BDSKStaticGroupType; }

- (BOOL)allowsRemoval { return YES; }

- (void)setPublications:(NSArray *)newPublications {
    if (newPublications != publications) {
		[[[self undoManager] prepareWithInvocationTarget:self] setPublications:publications];
        publications = [newPublications mutableCopy];
        [self setCount:[publications count]];
        [[self document] groupDidUpdate:self updatedPublications:YES];
    }
}

- (void)addPublication:(BibItem *)item {
    [self addPublicationsFromArray:@[item]];
}

- (void)addPublicationsFromArray:(NSArray *)items {
    if ([publications firstObjectCommonWithArray:items]) {
        NSMutableArray *mutableItems = [items mutableCopy];
        [mutableItems removeObjectsInArray:publications];
        items = mutableItems;
        if ([items count] == 0)
            return;
    }
    [[[self undoManager] prepareWithInvocationTarget:self] removePublicationsInArray:items];
    [publications addObjectsFromArray:items];
    [self setCount:[publications count]];
    [[self document] groupDidUpdate:self updatedPublications:YES];
}

- (void)removePublication:(BibItem *)item {
    [self removePublicationsInArray:@[item]];
}

- (void)removePublicationsInArray:(NSArray *)items {
    NSMutableArray *removedItems = [NSMutableArray array];
    for (BibItem *item in items) {
        if ([publications containsObject:item] == NO) continue;
        [removedItems addObject:item];
        [publications removeObject:item];
    }
    if ([removedItems count]) {
        [[[self undoManager] prepareWithInvocationTarget:self] addPublicationsFromArray:removedItems];
        [self setCount:[publications count]];
        [[self document] groupDidUpdate:self updatedPublications:YES];
    }
}

- (BOOL)containsItem:(BibItem *)item {
	return [publications containsObject:item];
}

- (void)setDocument:(BibDocument *)newDocument {
    [super setDocument:newDocument];
    if (document && tmpKeys) {
        for (NSString *key in tmpKeys)
            [publications addObjectsFromArray:[[document publications] itemsForCiteKey:key]];
        [self setCount:[publications count]];
        tmpKeys = nil;
    }
}

@end
