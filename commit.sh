./incver.sh
VER=$(cat .version)
NAME="v"$VER
git add .
git commit -m $NAME
git push -u origin master

