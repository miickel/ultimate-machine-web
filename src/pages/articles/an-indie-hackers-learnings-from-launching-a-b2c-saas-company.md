---
template: BlogPost
title: An Indie Hacker’s Learnings From Launching a B2C SaaS Company
description: A post about leaving the safety of a steady salary behind to become the sole founder of a software company.
date: 2020-04-11T10:46:39.888Z
isFeatured: false
featuredImage: /img/tayl-2019-review/tayl-logo-cover.png
colors:
  - '#F5EBE6'
  - '#4B4646'
tags:
  - tayl.app
  - SaaS
  - B2C
  - Indie Hacking
  - Entrepreneurship
---

About a year ago I spent all of my evenings and weekends to build a SaaS product I later dubbed "TAYL" -- **T**alk **a**t **Y**ou **L**ater. 3 months of focused work transformed a duct-taped MVP into a profitable product with a complete graphical profile, a landing page, a web app and browser extensions for both Chrome and Firefox. The goal for the product was to solve a problem I wanted to be solved, which is what motivated me to build it in the first place. The product was shipped quickly only because most of the classing "start a business"-tactics, like market research and SWOT, were skipped. I figured other people had the same problem I did, and that they'd be willing to pay if they were presented an attractive solution.

## The Problem

Listening to podcasts was the greatest part of my daily biking commute. Combining biking with podcasts, I not only got exercise and fresh air, but also knowledge and entertainment at the same time. The only problem was when there were no new interesting shows or episodes available. At the same time, my reading list grew longer and longer. That's when it hit me! I had pages upon pages of interesting content I wanted to read, but not enough time for it. I also had time to kill while commuting.

## The Solution

Luckily, I had recently been researching text-to-speech models and assessing their quality. The state-of-the-art models had improved drastically only in the past year or so, thanks to advancements in machine learning. Listening to a computer-generated voice was no longer as painful as before. The idea was to programmatically generate a Podcast feed by combining bookmarking with a text-to-speech engine of high quality. The MVP was built in a day or so and I started to use it immediately. A couple of months later I launched it online as a SaaS product.

TAYL lets you bookmark websites and store text content on your reading list. Saved bookmarks also get an audio version, which can be played either through the [web app](https://my.tayl.app), mobile apps ([iOS](https://apps.apple.com/us/app/tayl-app/id1471504094) and [Android](https://play.google.com/store/apps/details?id=se.ultimatemachine.tayl&hl=sv)) or as a Podcast.

`youtube: https://youtu.be/VEtr6pZBUrQ`

With the help of powerful hardware and machine learning, TAYL can provide natural-sounding narrations in 30+ languages and 200+ voices in only minutes.

## A Year in Review

TAYL officially launched in March 2019, so I thought now would be a good time to look back at what has happened since then. The first user signed up minutes after posting the product on [Product Hunt](https://www.producthunt.com/posts/tayl). 1,155 people created an account within the first week of launching. After 3 weeks, more than 2,000 accounts had been created. The product received its entire initial buzz from Product Hunt and word of mouth. I did no marketing.

![tayl.app dashboard](/img/tayl-2019-review/dashboard.png)

The image above is a snapshot of the [Open Startup](https://baremetrics.com/open-startups) dashboard set up for [tayl.app](https://tayl.app). Visit [TAYL's Interactive Dashboard](https://datastudio.google.com/s/ttKIEmlXtxY) to get a closer look at the numbers. The spike at the start of the graph illustrates the effects of a successful launch on Product Hunt.

### The First Paying Customers

The first paying customer subscribed on launch day. Subscriptions worth more than $700 had been sold within the first week. It surprised me, considering it was a B2C service with a premium price. Initially, the service had only one pricing plan. Either you paid $25/month with monthly billing or $108/year ($9/mo) with annual billing. There was no free plan, only a limited 7-day free trial. A high price would make coupon offers more attractive ("Save 50%" sounds more impressive than "Save 20%"). Only a few minutes were spent estimating the costs per user before launching. The prices were set to avoid unpredictable costs and allow high profit margins.

### Rethinking Plans and Pricing

Weeks after launch my time was occupied with fixing bugs, building apps for [iOS](https://apps.apple.com/us/app/tayl-app/id1471504094) and [Android](https://play.google.com/store/apps/details?id=se.ultimatemachine.tayl&hl=sv) and answering support emails. Time allowed me to review and summarize all the feedback sent in by users first by summer. The number one complaint was the high price. The number two complaint was about how the limitations of the free trial didn't allow users to fully experience the product. People are used to getting things online for free. The business model now had to change with real information about the running costs (in contrast to my earlier napkin guesstimates) and what users expected to pay for a service like this.

![tayl.app Plans and Pricing](/img/tayl-2019-review/plans-and-pricing.png)

After crunching the numbers, I settled for a credits-based subscription model. Users would each month receive a quota of `n` credits. Those credits could be used either on the standard voices, or the premium voices (higher quality). I introduced a more affordable "Standard" plan along with the new credits system. It had the same capabilities as the more expensive plan but came pre-loaded with 1/4th of the credits of the "Premium" plan. This still gave you 5-7 hours of audio each month, which would be enough for most according to usage statistics. The system wouldn't reject those who wanted more... they'd be able to continue to use up credits but would be billed for the overage use by the end of each month.

The "Standard" plan has now been live for 7 months. As seen in the chart below, it is edging closer and closer, and will soon outweigh, the MRR (Monthly Recurring Revenue) of the Premium plan. There's less churn and the conversion rate is notably higher. What also seems to be the case is that some users start with the Standard plan, monthly billing, to later commit to either Standard annual billing or even Premium annual billing with zero effort spent from my side upselling.

![MRR (Monthly Recurring Revenue) by Subscription Plan](/img/tayl-2019-review/chart-mrr-by-plan.svg)

The Premium plan is slightly trending downwards at the moment, while the Standard plan is trending upwards.

### Launching TAYL 2.0

After spending a couple of months fixing bugs, building new features and creating apps for iOS and Android, I decided to slap a "2.0"-label on it and re-do the whole launch routine. The release notes included:

- Support for more voices and languages (totaling 30+ languages and 180+ voices).
- Zapier integration -- Integrate TAYL with 1,500 other apps and services. No coding required.
- Native smartphone apps for both [iOS](https://apps.apple.com/us/app/tayl-app/id1471504094) and [Android](https://play.google.com/store/apps/details?id=se.ultimatemachine.tayl&hl=sv).
- The "Standard" plan -- a more affordable alternative with the same capabilities as the Premium plan.

If the first launch was a success, [TAYL's 2.0 Product Hunt](https://www.producthunt.com/posts/tayl-2-0) launch was mediocre, at best. Only a few upvotes and a small spike in traffic. The newsletter that was sent out to all 3,000+ users converted only a few to the new plan. Many hours were spent building cool new stuff, yet almost no one got to experience it. It was a bit demoralizing, to be honest. The product was also posted to the `/r/SideProject` subreddit as a story [how to build a SaaS that instantly turns profitable](https://www.reddit.com/r/SideProject/comments/d9nzbh/i_made_an_app_that_turns_any_text_into_a_podcast/), and to `/r/UsefulWebsites` as an [app that turns text into a podcast or audio book](https://www.reddit.com/r/UsefulWebsites/comments/df4534/i_hacked_together_an_app_that_turns_any_text_into/) around this time. The posts resulted in a traffic spike and some good feedback from grumpy Reddit users, but not many converted to paying.

![tayl.app - Websites to podcast](/img/tayl-2019-review/01-app.png)

Luck played a big role in the first launch being so successful. Not only did many people see it on Product Hunt thanks to the upvotes, but an [editorial about TAYL](https://www.producthunt.com/newsletter/2546) was also shared in their newsletter. Relying on luck is usually not how I roll, so something had to shift in my thinking. Instead of relying on the high volume in short bursts-opportunities that posting on other sites gives, the focus was shifted to more long-term efforts. You know, things like improving the product, SEO and making sure existing customers were happy. It is too early to say anything of this shift yet, but logic says it will help with growth in the long run and the overall feeling of doing things in a controlled and well thought out manner is soothing.

Writing this blog is part of the strategy.

## Learnings From Building a SaaS

If you're an Entrepreneur or Indie Hacker building your product or thinking about getting started, here are some of the things I learned while building TAYL. I hope they are helpful to you. Please share some of your learnings with me on [Twitter](https://twitter.com/miickel) if you've been in a similar situation.

- **Build what inspires you** -- You know you've got the right product founder-fit when you feel bothered that it's not finished yet. Create products that inspire and motivate you. That way you will rarely have any issues with procrastination and you'll know exactly what to focus on.
- **Start small, get results early** -- It is very helpful to first build a duct-taped MVP to get a feel for the potential of the product. With it, I was able to get 80% of the experience of the final product in only 1-2 days. Good enough to share with friends to get their opinion, but too ugly to show in public. To have something working early on makes the project feel smaller and the end-goal psychologically feel more attainable.
- **Aim for okay, not perfect** -- Had I not set a time limit for myself with the initial product launch, I'm not sure I would have released the product at all. At the time of launching, I was far from happy with the result. The initial launch might feel like a big deal when you're still fighting in the trenches. But in my experience, it's what happens after the launch that matters. Aim for an okay product you think a few people will sign up for and test, not for the perfect launch. Use it as an opportunity to learn about the market potential and get some early user feedback, not for growth.
- **Use your toolbox** -- I go through the same process at the start of every project. Spending days researching a myriad of tools and frameworks. Usually, I end up trying a few of them and finding both pros and cons. In the end, though, I tend to settle for tools I've used before. Avoiding the cool new thing gives you a good head start because there's no learning curve, and you know about all the limitations. Take it from me, it's very demoralizing to realize later on that your creativity is limited by your toolbox and that you have to restart from scratch to be able to solve the problem.
- **Listen to your users** -- TAYL had an automated survey ready at launch that was sent out to every user that deleted their account. It is still live today. Asking why someone decides not to use your product can hurt for your ego but offer some of the best insights you can get. In this case, I learned early on that the pricing did not match the value users expected to get out of using the product.

TAYL is now one year old and is starting to mature in terms of features and stability. The next focus for me is on [long-term growth](/articles/i-quit-my-cto-job-to-work-on-my-own-projects/#the-growth-masterplan). All systems are taking care of themselves and will scale without issues. The new subscription plan and pricing model seems to hit the sweet spot in terms of value and price. It will be exciting to see if the slow and steady MRR growth will pick up speed with my long-term marketing efforts in place.

If you haven't heard already, I'm currently working on a B2B version of TAYL. It will be released as an entirely new product, with similar features as TAYL, but aimed at businesses. If you have a blog or online newspaper, please let me know if you're up for beta testing. Sign up to the newsletter below if you're curious and would like more updates like this on [TAYL](/products/tayl-app) and [my other projects](/products).

**PS!** Try TAYL now and [listen to websites](https://tayl.app) -- Head over to tayl.app and use discount code `UM_BLOG` for 30% off your first payment.
