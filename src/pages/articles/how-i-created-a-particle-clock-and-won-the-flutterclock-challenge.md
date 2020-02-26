---
template: BlogPost
title: "How I Created a Particle Clock and Won the #FlutterClock Challenge"
description: Having only worked with Flutter once or twice before, this was a great opportunity for me to dive a bit deeper.
date: 2020-02-25T10:46:39.888Z
isFeatured: false
featuredImage: /img/flutter-particle-clock.png
tags:
  - FlutterClock
  - Flutter
  - Dart
  - Generative Art
  - "Open-Source"
  - Programming
---

Google announced [The Flutter Clock Challenge](https://youtu.be/rxs69_szCkE) on November 18, 2019. It was after the cryptic countdown timer on [flutter.dev](https://flutter.dev) printed **00:00:00** that the details were made public. The programming competition had a simple brief: design a clock using the Flutter UI toolkit. Entries would be judged by a panel of Google experts against four main criteria: Visual beauty, Novelty of idea, Code quality, and Overall execution.

Having only worked with Flutter once or twice before, this was a great opportunity for me to dive a bit deeper.

## Initial Ideas

A couple of weeks or so into the challenge I had come up with a few ideas, but not written a single line of code. My usual approach when tackling problems like this is to first seek out existing solutions for inspiration. Not this time. Instead, I started with a new document in Figma and sketched out a few ideas. They were all very simple and dull mono-color compositions of digital clock designs.

![Figma Flutter clock idea number zero](/img/flutter-clock-idea-00.png)

I got bored with my designs rather quickly, so I closed Figma and instead downloaded the [Flutter Clock GitHub repo](https://github.com/flutter/flutter_clock) to look at some sample code. The repo had two projects: one basic _analog clock_ and one basic _digital clock_. All my Figma designs were digital, so naturally, I launched the basic digital clock project. Again lacking inspiration, with no help from the sample project, I put the challenge on hold and started working on other things.

I started thinking about the challenge for real again a few days later, on one of my morning runs. A regular adult looks at a watch several times every day. For me, making the clock _interesting to look at_ was the true challenge. Is it possible to make "telling the time" an autotelic experience? I.e. looking at the watch is enjoyable even if you're not interested in the time. This would require more than a visually stunning design or a novel animation scheme.

1. What if the clock had a different appearance every time you looked at it?
2. Could we spike curiosity enough to make you long for the next design iteration? Or perhaps feel a bit sad when a design you liked is forever gone?
3. Could we randomize background shapes, colors and animations in such a way to make it a) look good, b) random enough to satisfy 1 & 2, and c) not distract too much from you telling the time?

Having never done any generative art before, or much Flutter at all, I set out to build a clock like that.

## Particles and Randomness

The first iteration of the clock was anything but a clock. As mentioned above, I started with the sample digital clock project instead of starting from scratch. The first Widget created was a [CustomPainter](https://api.flutter.dev/flutter/rendering/CustomPainter-class.html) that simply drew a circle. Pretty neat, but not very interesting in the long run. Randomness was added. Starting with color, and then shape position and size. All logic was still in the `paint()`-method of a single `CustomPainter`. This made it pretty much impossible to animate things, so a bunch of the logic was refactored out into a simple particle system. I looked at [The Flutter Vignettes](https://flutter.gskinner.com) project for inspiration on how it could be done.

`youtube: https://youtu.be/p6QbxpkM6FI`

This is when the idea of making an analog particle clock became more apparent.

## Turning Particles Into an Analog Clock

Once the idea was planted, all I had to do was to write the code to make it all happen. The math parts were what took the most time for me to get right. It was mostly math I learned, and unfortunately forgot, many years ago. Angles, radians, PI and that sort of stuff. There are tons of solutions available online, but more than often you will have to make changes to fit your use case.

Here's how to get the angle in radians for the hour hand:

```dart
/// Gets the radians of the hour hand.
double _getHourRadians() =>
    (time.hour * pi / 6) +
    (time.minute * pi / (6 * 60)) +
    (time.second * pi / (360 * 60));
```

I included `time.minute` and `time.second` in the calculation to make the hand animate smoothly between hours.

Then, getting a 2D movement vector from radians is simple.

```dart
// Particle movement vector.
p.vx = sin(-angle);
p.vy = cos(-angle);
```

`p.vx` and `p.vy` now has information about how far the particle should move with each animation tick, while remaining in the angle of the hour hand.

In addition to the clock hands, a particle could also spawn as noise. It would then be emitted in a random direction from the center. At birth, all particles are also assigned a random velocity, color, size and painting style (fill or stroke). This makes the clock a bit more interesting to look at.

![An early version of the Flutter Particle Clock](/img/flutter-clock/flutter-clock-early-version.jpeg)

An early version of the clock. This one has quarter markers, and some particles have speed marks. The first versions of the clock were just particles, but I didn't bother to take any screenshots of those.

## Adding Layers With Flutter Widgets

Up until this point, everything was drawn using a single `CustomPainter` widget. The clock looked fine, but it was hard to tell the time. Also, the background was a single color and looked plain boring.

Flutter is great for building complex layouts. It's a toolkit for user interfaces, after all. To stack a bunch of widgets on top of each other, you just wrap them in a `Stack` widget. The particle clock ended up with a scene widget responsible for building 3 main layers:

1. **Background** - a `Stack` with a `CustomPaint` widget drawing randomized shapes of different colors and painting styles, and a `BackdropFilter` with a blur effect applied to it.
2. **Clock Face** - a `Stack` with two `CustomPaint` widgets:
   1. Clock markings - drawing the clock markings. Every minute mark, with extra visibility every 5th-minute mark.
   2. Seconds hand - drawing the two seconds hand arcs.
3. **Particle FX** - a `CustomPaint` widget responsible for drawing all the particles.

```dart
@override
Widget build(BuildContext context) {
  return AnimatedContainer(
    duration: Duration(milliseconds: 1500),
    curve: Curves.easeOut,
    color: _bgColor,
    child: ClipRect(
      child: Stack(
        children: <Widget>[
          _buildBgBlurFx(),
          _buildClockFace(),
          CustomPaint(
            painter: ClockFxPainter(fx: _fx),
            child: Container(),
          ),
        ],
      ),
    ),
  );
}
```

Even though the underlying code is complex, Flutter makes laying things out manageable with widget composition.

![Flutter Clock widget layers](/img/flutter-clock/particle-clock-render-layers-overlay.png)

An overlay of the clock's drawing layers.

![Flutter particle clock](/img/flutter-clock/particle-clock-render-layers.png)

Here's the same picture as above, but without the overlays.

## Animating in Sync With Time

I had the idea early on that it would be cool if the animation happened in sync with the clock ticking. The solution that ended up in the final version is very simple. Getting there was not. Initially, I made it into a much bigger problem than it was, and tried all sorts of weird hacks to make it work.

```dart
@override
void tick(Duration duration) {
  var secFrac = DateTime.now().millisecond / 1000;

  var vecSpeed = duration.compareTo(easingDelayDuration) > 0
      ? max(.2, Curves.easeInOutSine.transform(1 - secFrac))
      : 1;

  particles.asMap().forEach((i, p) {
    // Movement
    p.x -= p.vx * vecSpeed;
    p.y -= p.vy * vecSpeed;
    // etc...
  }
}
```

This code runs on each animation tick. By using `DateTime.now().millisecond` as a fraction of a millisecond in combination with `Curves`, we get a value between 0 and 1. The `max` function makes sure that the number stays above 0.2 to always keep the particles moving with each tick.

The `vecSpeed` number is then used in combination with the movement vector when calculating the particle's new `x` and `y` positions.

## Color Palettes and Legibility

It's usually frowned upon when randomizing colors in graphical user interfaces. With good reason, of course, because it often makes the GUI less accessible. Applying random colors to a GUI while still maintaining legibility is not an easy problem to solve. Luckily, Flutter has some tools to make it easier for us.

To get something to start with, I used the [ColourLovers API](https://www.colourlovers.com/) to fetch some of the most liked palettes their users had crowdsourced. Off the bat, many of the palettes had poor contrast ratios between the colors. I solved this by creating a script that filtered the array of palettes, based on the [WCAG Contrast](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html) guidelines. Once filtered, the list only contained palettes where there was at least one color combination with a contrast ratio greater than or equal to 4.5.

Then, in Flutter, we only have to use the `computeLuminance` method of the `Color` class to find a good match.

```dart
/// Gets a random palette from a list of palettes and sorts its'
/// colors by luminance.
///
/// Given if [dark] or not, this method makes sure the luminance
/// of the background color is valid.
static Palette getPalette(List<Palette> palettes, bool dark) {
  Palette result;

  while (result == null) {
    Palette palette = Rnd.getItem(palettes);
    List<Color> colors = Rnd.shuffle(palette.components);

    var luminance = colors[0].computeLuminance();

    if (dark ? luminance <= .1 : luminance >= .1) {
      var lumDiff = colors
          .sublist(1)
          .asMap()
          .map(
            (i, color) => MapEntry(
              i,
              [i, (luminance - color.computeLuminance()).abs()],
            ),
          )
          .values
          .toList();

      lumDiff.sort((List<num> a, List<num> b) {
        return a[1].compareTo(b[1]);
      });

      List<Color> sortedColors =
          lumDiff.map((d) => colors[d[0] + 1]).toList();

      result = Palette(
        components: [colors[0]] + sortedColors,
      );
    }
  }
  return result;
}
```

The code returns a `Palette`, which simply holds a `List` of `Color`s. The palette is sorted by the difference in luminance between the colors. The caller of this method can then be sure that the first and last items of `components` have a good enough contrast ratio.

![Different color variations of the Flutter Particle Clock](/img/flutter-clock/particle-clock-montage.png)

A small subset of the many different color variations possible. Notice how the accent color is always the one furthest from the background color, in terms of luminance.

## Final Touches

Most of the magic happened in the final hours of coding this thing. The emitted particles were made to fade in from the center, instead of instantly popping up from nowhere. This made the overall appearance much smoother. I did the same with the arcs/speed marks and limited them to only a few particles at a time to reduce visual complexity.

Initially, I wasn't sure how to avoid to emit noise particles in the directions of the clock hands, but knew it had to be done. I solved it with a bit of brute force code after giving up on searching for a mathematical solution (of course there is one, only I'm not patient enough to find it).

```dart
// Find a random angle while avoiding clutter at the hour & minute hands.
var am = _getMinuteRadians();
var ah = _getHourRadians() % (pi * 2);
var d = pi / 18;

// Probably not the most efficient solution right here.
do {
  angle = Rnd.ratio * pi * 2;
} while (_isBetween(angle, am - d, am + d) || _isBetween(angle, ah - d, ah + d));
```

It worked! This made it much easier to tell the time with all the noise particles out of the way from the hands.

## Results

It's been frustrating at times (thanks, math! 😅). But in the end, I'm satisfied with the results. I especially like the shifting colors and the organic-looking unpredictable animation.

Flutter is great for this sort of stuff. Creativity calls for experimentation, and that's where Flutter shines. At the start of this project, I had no idea it would end up like this. Remember, the idea was to build a digital clock at first. But thanks to a few lucky mistakes, and thousands of small iterations on different ideas, it morphed into something better than first imagined.

`youtube: https://youtu.be/VPbcVhKIzIo`

Martin Aguinis, Global Marketing Lead Flutter for Google, [tweeted out](https://twitter.com/martinaguinis/status/1231707789740969987?s=21) that they received **850 unique submissions across 86 different countries**. Out of all those, the jury of Google experts picked my entry for the **Grand Prize** (a loaded Apple iMac Pro valued at approximately $10,000). I have never considered myself a good programmer, so when Martin reached out to me my surprise was real! I still can't believe I've won.

Thanks to Google and the Flutter team for making this challenge happen, and thanks to all of you who cheered me on and [showed your support on Twitter](https://twitter.com/miickel/status/1219311659984080897?s=21)!

Subscribe to my newsletter below and [Follow me on Twitter](https://twitter.com/miickel) for more Flutter content.

This open-source project is licensed under MIT.
