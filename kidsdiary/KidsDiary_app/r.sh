NODE_ENV=production

cd KidsDiary_app

git clone git://github.com/creationix/nvm.git ~/.nvm
source ~/.nvm/nvm.sh
nvm install 5.8
npm -v
node -v

npm install
npm install --only=dev
npm run gulp
npm run stylus


npm install --only=dev
npm run gulp
npm run stylus
echo exit | echo dist | ./activator dist

