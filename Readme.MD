docker network create networkapp

cd .\App\

docker build . -t nodeapp

docker run --name nodecontainer1 --network networkapp -p 2222:9999 -e APPID=2222 -d nodeapp 
docker run --name nodecontainer2 --network networkapp -p 3333:9999 -e APPID=3333 -d nodeapp 
docker run --name nodecontainer3 --network networkapp -p 4444:9999 -e APPID=4444 -d nodeapp
docker run --name nodecontainer4 --network networkapp -p 5555:9999 -e APPID=5555 -d nodeapp  

cd ..

docker build . -t nginx
docker run --name nginxcontainer --network networkapp -p 80:80 -d nginx