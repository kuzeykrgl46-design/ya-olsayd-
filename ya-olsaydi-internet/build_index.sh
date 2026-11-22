#!/bin/sh
# Assemble an episode page: shared head (from the Kış page) + lib_internet.js + episode scene + shared tail.
# Usage: sh build_index.sh <scene.js> <timeline.js> <out.html> <title> <duration>
K=../ya-olsaydi-kis/index2.html
s=$(grep -n "^function subtitles" $K | cut -d: -f1)
{ sed -n 1,776p $K | sed "s|<title>.*</title>|<title>$4</title>|; s|<script src=\"timeline.js\"></script>|<script src=\"$2\"></script>|; s|max=\"40\"|max=\"$5\"|"; echo; cat lib_internet.js; echo; cat "$1"; echo; sed -n "$s,\$p" $K; } > "$3"
