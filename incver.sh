VER=$(cat .version)
echo $((VER+1)) > .version
