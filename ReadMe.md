Steps to run:

See Live demo :

  ## https://collaborative-texteditor.herokuapp.com
  
 copyand paste the same address on browser/browser-abs
 
  
  
## Step 1:
https://dashboard.pusher.com/ create app using this url  just have to create an account and then create the app

## Step 2: 
Now select the app you have created ,and then select app settings and
## Enable Client Events  
so you can listen to client events

## Step 3:

git clone https://github.com/KumailHussain/Calloborative-text-editor.git

## Step 4:

Insert your api key for client side

path= Calloborative-text-editor/js/app.js 

Replace this line according to Your app  (select javascript as client)

     var pusher = new Pusher('INSERT_YOUR_KEY_HERE', {
     
      cluster: 'Your Api Cluster',
      
      encrypted: true
      
    });
        
      you will find key from your app dashbaord 
      
## Step 5:

Insert your api key for Server side

path= Calloborative-text-editor/server.js

Replace this line according to Your app (select node as server)

     var pusher = new Pusher({

      appId: 'INSERT_YOUR_APP_ID_HERE',
  
       key: 'INSERT_YOUR_KEY_HERE',
  
      secret:  'INSERT_YOUR_SECRET_HERE' 
  
     });


## Step 6:

cd Calloborative text editor

## Step 7:

npm install
     
## Step 8:
npm start

You can now see the demo
