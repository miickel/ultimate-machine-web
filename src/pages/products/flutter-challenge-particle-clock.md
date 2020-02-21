---
template: Product
title: Flutter Particle Clock
description: My entry to the Flutter Clock Challenge.
url: https://github.com/miickel/flutter_particle_clock
startDate: 2020-02-05T00:00:00.000Z
featuredImage: /img/flutter-particle-clock.png
tags:
  - FlutterClock
  - Flutter
  - Dart
  - Generative Art
  - Open Source
  - Programming
---

Google announced [The Flutter Clock Challenge](https://youtu.be/rxs69_szCkE) on November 18, 2019. It was after the cryptic countdown timer on [flutter.dev](https://flutter.dev) printed **00:00:00** that the details were made public. The programming competition had a simple brief: design a clock using the Flutter UI toolkit. Entries would be judged by a panel of Google experts against four main criteria: Visual beauty, Novelty of idea, Code quality and Overall execution.

Having only worked with Flutter once or twice before, this was a great opportunity for me to dive a bit deeper. I ended up with an analog clock design made up entirely of moving particles. Some feature highlights:

- It randomly selects color palettes while still maintaining legibility at all times.
- It supports **light mode** and **dark mode** -- picked up from room brightness level.
- It scales to fit the screen space available and adjust calculations & rendering accordingly.
- It renders it all in at least 60 FPS on modern devices.
- It shifts and moves constantly, making it fun to look at.

`youtube: https://youtu.be/VPbcVhKIzIo`

![Different color variations of the Flutter Particle Clock](/img/flutter-clock/particle-clock-montage.png)

![Flutter particle clock](/img/flutter-clock/particle-clock-render-layers.png)

This open source project is licensed under MIT.
