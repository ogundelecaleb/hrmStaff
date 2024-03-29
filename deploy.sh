echo "switching to branch, master"
git checkout master 

echo "Building app ..."
npm run build

echo "Deploying files to server...."
scp -r build/* moses@78.110.169.252:/var/www/78.110.169.252/


echo "Done"