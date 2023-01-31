Requirements:
yarn add expo
yarn install

Then you can:

cd api-practice
yarn add expo
yarn install
yarn start

Note:
Remember to change the fetch IP address in the
example Expo app to the ip address of the machine
the backend Go program is running on!

On Windows and Mac use 'ipconfig' in terminal,
I'm on a Gnome version of Linux so I found mine in
my wifi settings.

Since I don't have an iphone I can't test this,
but there might be an error with iphones only allowing
HTTPS requests and not HTTP ones. For now there's a way
to allow HTTP requests in the Expo IOS files, but
the real and long-term solution is to make the backend 
HTTPS encrypted with a certification and have the React
Native fetch request just be to an https address.