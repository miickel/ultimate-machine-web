---
template: BlogPost
title: 'Learning Elixir and Building a SaaS with Phoenix Framework'
description: Podopi is a SaaS that was built in Elixir, using the Phoenix Framework. This article outlines my path to learning Elixir and the steps I took to get from n00b to launching my own product in less than 4 months.
date: 2021-11-25T14:46:39.888Z
isFeatured: false
featuredImage: /img/phoenix-framework.png
colors:
  - '#FA98B4'
  - '#550C1E'
tags:
  - Elixir
  - Erlang
  - Phoenix Framework
  - Phoenix LiveView
  - Programming
  - Entrepreneurship
  - SaaS
  - B2B
  - Podopi
---

Learning new languages is not necessary in order to improve as a programmer.
You can focus on one langauge and still not find enough time to learn everything about it.
Programming languages, not unlike spoken languages, use nothing but building blocks.
We use words to build sentences, sentences to build paragraphs and paragraphs to build meaning.
Letters and words can be chained together in an infinite number of combinations.
Same goes for programming language syntax.

## Why Learn a New Programming Language?

If you're an engineer with 10+ years of experience in a language, you have the power to create anything within your imagination.
So why would you ever want to learn a new language?

For me, it's part curiosity, FOMO and "grass is greener"-syndrome.
But mostly, it's the combination of two things I'm passionate about: learning and creating.

Most of my professional life has revolved around JavaScript in some form or another.
Before Node.js, we used clicks of JS to add interactivity to otherwise mostly static web pages.
Today, JavaScript is a hydra behemoth monster capable of pretty much anything.
It's a bit messy, but also beautiful in a wicked way.

During my career, I've also written software in ASP, .NET (C#), Java, Pascal, PHP, GO, Rust, Flutter, Haskell and a few more.

Only one of those languages is a functional language; namely Haskell.

Haskell never clicked for me.
I can look at code someone else has written and clearly see it's beautiful, but I've always had a hard time writing it myself.
It could be because Haskell is too much of a precise/mathematically correct language, and my brain is leaning more towards the chaotic/creative.

At a first glance, Elixir seemed like a friendlier functional programming language than Haskell to me.
Even though we never clicked, I value many of the concepts adopted by the language.
Elixir seemed like a good middle-ground between useful and strict.
Sort of Haskell and Python (or Ruby) combined.

Elixir has received a lot of buzz lately.
Big tech companies, like Heroku, Discord and WhatsApp, have adopted it successfully at scale.

I made it my goal to learn Elixir in 2021.

## Learning Elixir

The official Elixir website describes the language beautifully:

> "Elixir is a dynamic, functional language for building scalable and maintainable applications.
> Elixir leverages the Erlang VM, known for running low-latency, distributed, and fault-tolerant systems.
> Elixir is successfully used in web development, embedded software, data ingestion, and multimedia processing, across a wide range of industries."

How we learn best varies from person to person.
Normally I learn best by doing.
But this time I happened to be tired of "doing", which is why I decided to start slowly by mostly reading:

- The official documentation over at [elixir-lang.org](https://elixir-lang.org/).
- [Programming Phoenix](https://pragprog.com/titles/phoenix14/programming-phoenix-1-4/), by Chris McCord, Bruce Tate and José Valim.
- [Test-Driven Development with Phoenix](https://www.tddphoenix.com/), by German Velasco.

These resources gave me the confidence to start working on a project of my own.

## Building a SaaS in Elixir

Since launching [TAYL](https://www.tayl.app) in 2019, I've been testing several ideas of what A.I. can do for audio.
TAYL lets you turn any text, be it a website, a document or something else, into audio.
Audio you can listen to on iOS, Android, as a Podcast or online via the web application.
Thousands of users word-wide have seen the benefits of listening instead of reading.

To test the waters with my newfound Elixir-skills, I decided to build upon my learnings from TAYL.
That way I could fall back to my existing solutions written in Node.js, if I ever were to get stuck.

This project entailed building a SaaS that would help website owners convert their written words into audio.
My initial ideas only involved audio, but I later also included video.
The application would then distribute the audio and video on to platforms such as Apple Podcasts, Spotify and YouTube.

The project involved many moving parts that would need to be orchestrated order to work good together:

- User accounts and authentication.
- Support subscription payments and one-time purchases.
- Request and scrape web pages.
  - Handle broken and invalid HTML markup.
  - Extract metadata, such as title, author, article body, featured image, publish date, categories and so on.
  - Produce a simplified version of the website, with just the content of the article.
- Convert articles written in HTML into SSML (Speech Synthesis Markup Language).
- Request and parse RSS feeds.
  - There are 3 primary RSS specifications, but many websites do not even cohere to those.
- Periodically fetch new content from RSS feeds.
- Audio processing:
  - Concatenation of multiple files.
  - Cross-fading clips.
  - Encode audio to strike a balance between quality and file size.
- Video processing:
  - Generate video frames from a template created with HTML and CSS with metadata from the article.
  - Encode video with embedded audio from before.
- Download and upload to cloud storage.
- Generate podcast RSS feed from episode data.
- Publish video files to YouTube.
- Search and browse sound tracks from a partner library.

Initially the project scope was much smaller.
The realization how quickly I was able to iterate and get things done made me confident in adding more and more features.

## Test-Driven Development in Elixir

As a good student of German's book, I did my best to use test-driven development throughout.
Unit tests in Elixir are usually written in ExUnit.
For the best experience, I recommend looking into how to integrate the test environment with your editor or IDE.
In my case, [vim-test](https://github.com/vim-test/vim-test) did the trick!

If you do TDD properly, you should be able to build an entire working web application without ever having to launch a web browser.
This project was built with [Phoenix Framework](https://phoenixframework.org), which has great support for testing.

In the example below, you can see how we're able to do assertions based on HTML-like selectors.
This should look familiar to you if you've ever done testing in a modern UI library before, like Vue or React.

```Elixir
  describe "PodcastLive :index" do
    test "displays podcast title and description", %{conn: conn, user: user} do
      podcast = insert(:podcast, user: user)

      {:ok, view, _html} = live(conn, Routes.podcast_path(conn, :index, podcast.id))

      assert has_element?(view, "h2", podcast.title)
      assert has_element?(view, "div", podcast.description)
    end

    test "lists podcast episodes", %{conn: conn, user: user} do
      episodes = insert_list(3, :episode)
      podcast = insert(:podcast, user: user, episodes: episodes)

      {:ok, view, _html} = live(conn, Routes.podcast_path(conn, :index, podcast.id))

      for episode <- episodes do
        assert has_element?(view, "[data-test=episode_title]", episode.title)
      end
    end

    test "lists podcast feeds", %{conn: conn, user: user} do
      feeds = insert_list(3, :feed)
      podcast = insert(:podcast, user: user, feeds: feeds)

      {:ok, view, _html} = live(conn, Routes.podcast_path(conn, :index, podcast.id))

      for feed <- feeds do
        assert has_element?(view, "[data-test=feed_title]", feed.title)
      end
    end
  end
```

We start out with the end in mind when doing test-driven development.
In the example above, we test that this page displays a podcast title and description.
It should also list podcast episodes and feeds.

## Results

The application was deployed to Google Cloud.
It could have been deployed elsewhere, but since I settled for Google Cloud Storage, I figured the app could run there just as well.
I'm planning to move parts of the app over to [fly.io](https://fly.io) in the future, to leverage their edge network for improved performance.

Only a couple of customers have registered an account so far.
We've only done a little marketing, so it's too early to say if it's a hit or miss.
Either way, I'm happy with the result.

[![Podopi](/img/podopi/podopi-landing.png)](https://www.podopi.com)

Visit [podopi.com](https://www.podopi.com) to check it out.
The landing page was built with Next.js and TailwindCSS.
Sign up for a free trail if you have a website and would like to provide your readers with audio.

## Conclusion

Creating the project took me about 3 months, while also working on other things and trading the stock market to earn a living.
It took me a couple of weeks to warm up to Elixir, and functional programming.
But after that I felt as efficient, if not even more efficient, as I can be with JavaScript and Node.js.
Having a test-driven approach helped me iterate and learn quickly.
There were many times when I was unsure how to best accomplish a specific task in Elixir, when ExUnit helped me test multiple solutions to select the best fit.

Elixir, and Phoenix Framework in particular, is the "batteries included"-solution I've been looking for.
Together with Oban, a task queue built on top of Postgres, I feel empowered to build scalable applications quickly.

Elixir is not a silver bullet of course, but a valuable addition to my toolbox that I'm sure I'll use again in the future.
