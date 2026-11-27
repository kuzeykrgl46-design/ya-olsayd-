#!/bin/sh
# Bölüm 2 page = Bölüm 1 scene file (sets, props, consts) + Bölüm 2 scenes/render, via build_index.sh.
cat b1_scene.js b2_scene.js > .b2_combined.js && sh build_index.sh .b2_combined.js timeline2.js index2.html "Ya Olsaydı #4 Çay Bölüm 2" ${1:-29.5} && rm .b2_combined.js
