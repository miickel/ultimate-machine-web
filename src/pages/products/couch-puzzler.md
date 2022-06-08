---
template: Product
title: CouchPuzzler
description: An experiment to use a JavaScript P2P library as the communication interface in a Flutter app to build a P2P couch co-op multiplayer game.
url: https://couchpuzzler.vercel.app/
startDate: 2022-03-14T00:00:00.000Z
featuredImage: /img/couch-puzzler/couchpuzzler.png
colors:
  - '#64CED6'
  - '#1A1724'
tags:
  - Flutter
  - Dart
  - JavaScript
  - GUN
  - 'Game Development'
  - 'Open-Source'
---

Flutter is a fun platform to build interactive experiences upon.
You write code in Dart, which is compiled into efficient applications that can run on iOS, Android, desktop and now also the web.
It's been two years since I last wrote Dart code, then winning Google's [Flutter Clock Challenge](https://docs.flutter.dev/clock) with my [Particle Clock](/products/flutter-particle-clock) entry.
Since then, the Flutter team has shipped tonnes of features and improvements to the platform.

I spent the weekend trying out some of these shiny new features.
The product became a small multiplayer game that you can play from the comfort of your couch, using smartphones and tablets as controllers.

## Run Flutter on the Web

Running Flutter on the web feels oddly familiar to me.
Perhaps some of you remember tech like Shockwave, Flash and Sliverlight from the old days of web development?
None of those are used in any large extent today, luckily.
But how is Flutter any different?

What's different today from back then is that web browsers can now run compiled languages that target [WebAssembly (WASM)](https://webassembly.org/).
This means the end-user will never have to install plug-ins in order to run your web application.
It's all ready to go, right in the browser!

Flutter for web compiles to WASM, and runs efficiently in modern web browsers.

## When to Use Flutter Web

Should we stop writing HTML and JavaScript now, altogether?
We sure can, but probably shouldn't.
Flutter for web shines when building interactive _web applications_.
For standard web pages, that need things like SEO optimizations, accessibility and so on we should stick to using other tech.

Flutter is great if you're on a low budget and want to deploy something quickly.
You can deploy to iOS, Android, desktop... from a single codebase.
Because of the custom-built rendering engine that ships with Flutter, you can be sure that your app looks and runs great everywhere.

## Using JavaScript in Flutter

Why would anyone in their right mind use JavaScript in Flutter then?
In my case, I looked around for a native Dart solution to simple P2P communication, but found none.
My search lead me to a NPM package, and a JavaScript library called [GUN](https://gun.eco/).

Luckily, the Dart web platform supports calling JavaScript functions using the [js](https://pub.dev/packages/js) package.
I was able to use the js-library to call functions in GUN and bubble events in JavaScript to be handled in Dart.

## Scan to Play

To start the game, scan the QR-code with your smartphone or tablet.
You can play up to 8 players.
The game will start when all players have pressed "Ready" on their controller.
The goal of the game is to get all numbers in the ascending order, starting from 1.
Like a classic sliding puzzle, you can only move 1 tile at a time.

Visit [couchpuzzler.vercel.app](https://couchpuzzler.vercel.app/) to play! Or watch me demo the game here:

`youtube: https://youtu.be/6T14xsYqE7M`

Sorry for the potato production quality, I just had a couple of minutes to record the video and wanted to present all the features in one go.
