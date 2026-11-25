#!/bin/sh
# Assemble an episode page: shared head (Kış page: map, helpers) + İnternet libs (characters etc.) + episode scene + shared tail.
# Usage: sh build_index.sh <scene.js> <timeline.js> <out.html> <title> <duration>
K=../ya-olsaydi-kis/index2.html; I=../ya-olsaydi-internet
s=$(grep -n "^function subtitles" $K | cut -d: -f1)
{ sed -n 1,776p $K | sed "s|<title>.*</title>|<title>$4</title>|; s|<script src=\"timeline.js\"></script>|<script src=\"$2\"></script>|; s|max=\"40\"|max=\"$5\"|"; echo; cat $I/lib_internet.js; echo; cat $I/lib_b2.js; echo; cat "$1"; echo; sed -n "$s,\$p" $K; } > "$3"
