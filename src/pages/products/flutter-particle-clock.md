---
template: Product
title: Flutter Particle Clock
description: The grand prize-winning entry of Google's Flutter Clock competition.
url: https://github.com/miickel/flutter_particle_clock
startDate: 2020-02-05T00:00:00.000Z
featuredImage: /img/flutter-particle-clock.png
colors:
  - '#F6EDB7'
  - '#24182C'
tags:
  - FlutterClock
  - Flutter
  - Dart
  - Generative Art
  - 'Open-Source'
  - Programming
---

Google announced [The Flutter Clock Challenge](https://youtu.be/rxs69_szCkE) on November 18, 2019. It was after the cryptic countdown timer on [flutter.dev](https://flutter.dev) printed **00:00:00** that the details were made public. The programming competition had a simple brief: design a clock using the Flutter UI toolkit. Entries would be judged by a panel of Google experts against four main criteria: Visual beauty, Novelty of idea, Code quality and Overall execution.

Having only worked with Flutter once or twice before, this was a great opportunity for me to dive a bit deeper. I ended up with an analog clock design made up entirely of moving particles.

See also: [How I Created a Particle Clock and Won the #FlutterClock Challenge](/articles/how-i-created-a-particle-clock-and-won-the-flutterclock-challenge)

## Feature Highlights

The clock was built to run smoothly on modern devices with 5:3 screens.

- It randomly selects color palettes while still maintaining legibility at all times.
- It supports **light mode** and **dark mode** -- picked up from room brightness level.
- It scales to fit the screen space available and adjust calculations & rendering accordingly.
- It renders it all in at least 60 FPS on modern devices.
- It shifts and moves constantly, making it fun to look at.

`youtube: https://youtu.be/VPbcVhKIzIo`

![Different color variations of the Flutter Particle Clock](/img/flutter-clock/particle-clock-montage.png)

![Flutter particle clock](/img/flutter-clock/particle-clock-render-layers.png)

The [Flutter Clock Contest Results](https://medium.com/flutter/its-time-the-flutter-clock-contest-results-dcebe2eb3957) were revealed February 25th, 2020. Google received 850 unique submissions across 86 different countries. Out of all those, the jury of experts liked the Particle Clock the most and selected it as the grand prize winner.

> "Judges were in awe from the visual effect, execution, code quality and overall novelty of this clock. The mathematical complexity of particle calculation was impressive."

`youtube: https://youtu.be/PaPUkxYHDUw`

This open-source project is licensed under MIT.
