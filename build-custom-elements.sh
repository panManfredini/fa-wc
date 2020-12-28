#!/bin/bash
types=("solid" "brands" "regular")
echo "" > index.js
for t in "${types[@]}"; do
	list=$(ls "node_modules/@fortawesome/fontawesome-free/svgs/$t/"*.svg)
	for f in $list; do
		svg=$(cat $f)
		name=$(basename "$f" ".svg")
		dashedname="fa-$name"
		if [ "$t" = "regular" ]; then
			dashedname="fa-$name-o"
		fi
		camelcasename=$(echo "$dashedname" | awk -F"-" '{for(i=1;i<=NF;i++){$i=toupper(substr($i,1,1)) substr($i,2)}} 1' OFS="")
		echo "import {createStaticComponent,iconStyleTemplate} from \"../src/iconbuilder.js\"" > "./icons/$dashedname.js" 
		echo "export const $camelcasename = createStaticComponent(\"$dashedname\",\`$svg\`,iconStyleTemplate);" >> "./icons/$dashedname.js"
		echo "export {$camelcasename} from \"./icons/$dashedname.js\"" >> index.js
	done
done


