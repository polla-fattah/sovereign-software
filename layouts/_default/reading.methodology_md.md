{{- if not (hasPrefix (strings.TrimLeft (printf " %c%c%c" 9 10 13) .RawContent) "# ") -}}
# {{ .Title }}

> {{ .Site.Params.tagline }}

{{ end -}}
{{ .RawContent }}
