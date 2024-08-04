import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";

import "./style.scss";

import axios from "axios";
import { BACKEND_URL } from "../../../shared/constants/Variables";

const About = () => {

  const [about, setAbout] = useState({});

  const location = useLocation();

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/admin-notes-public${location.pathname}`)
      .then(({ data }) => {
        setAbout(data.content);
      })
      .catch((err) => {
        console.log("something went wrong.")
      });


  }, []);

  return (

    <div className='about-section'>

      <div className="about-conntainer">

        {
          Object.keys(about).length !== 0 ?
            <div className="about">
              <div
                className="ql-editor"
                dangerouslySetInnerHTML={{ __html: about }}
              />
            </div>
            : ""
        }


      </div>
    </div>

    // <div className='about-section'>

    //   <div className="about-conntainer">



    //     <h2 className="mt-3">What's Micple?</h2>

    //     <p className="mt-2">
    //       Micple is a social networking site that makes it easy for you to connect and share with
    //       family and friends online.
    //     </p>

    //     <p className="mt-2">
    //       Micple is a social networking website where users can post comments, share photographs,
    //       and post links to news or other interesting content on the web, chat live, and watch short-form video.
    //     </p>
    //     <p className="mt-2">
    //       Shared content can be made publicly accessible,
    //       or it can be shared only among a select group of friends or family, or with a single person.
    //     </p>

    //     <ul className="ul-design">
    //       <li>
    //         Keeping up with friends is faster and easier than ever. Share updates and photos, engage with friends and Pages, and stay connected to communities important to you.
    //       </li>
    //     </ul>

    //     <h6 className="mt-2">Features on the Micple  app include:</h6>

    //     <ul className="ul-design">
    //       <li>
    //         Connect with friends and family and meet new people on your social media network
    //       </li>
    //       <li>
    //         Set status updates & use Micple  emoji to help relay what’s going on in your world
    //         Share photos, videos, and your favorite memories.
    //       </li>
    //       <li>
    //         Get notifications when friends like and comment on your posts
    //       </li>
    //       <li>
    //         Find local social events, and make plans to meet up with friends
    //       </li>
    //       <li>
    //         Backup photos by saving them in albums
    //       </li>
    //       <li>
    //         Follow your favorite artists, websites, and companies to get their latest news
    //       </li>
    //       <li>
    //         Look up local businesses to see reviews, operation hours, and pictures
    //       </li>
    //       <li>
    //         Buy and sell locally on Micple Marketplace
    //       </li>
    //       <li>
    //         Watch live videos
    //       </li>
    //       <li>
    //         Micple allows you to maintain a friends list and choose privacy settings to tailor who can see content on your profile.
    //       </li>
    //       <li>
    //         Micple allows you to upload photos and maintain photo albums that can be shared with your friends.
    //       </li>
    //       <li>
    //         Micple supports interactive online chat and the ability to comment on your friend's profile pages to keep in touch, share information or to say "hi."
    //       </li>
    //       <li>
    //         Micple supports group pages, fan pages, and business pages that let businesses use Micple as a vehicle for social media marketing.
    //       </li>
    //       <li>
    //         Micple 's developer network delivers advanced functionality and monetization options.
    //       </li>
    //       <li>
    //         Chat with Micple  friends and family members, or auto-display Micple  pictures with the Micple  Portal device.
    //       </li>
    //     </ul>

    //     <p className="mt-2">
    //       The Micple  app does more than help you stay connected with your friends and interests.
    //       It's also your personal organizer for storing,
    //       saving and sharing photos. It's easy to share photos straight from your Android camera,
    //       and you have full control over your photos and privacy settings. You can choose when to keep individual
    //       photos private or even set up a secret photo album to control who sees it.
    //     </p>

    //     <p className="mt-2">
    //       Micple also helps you keep up with the latest news and current events around the world.
    //       Subscribe to your favorite celebrities, brands, news sources, artists, or sports teams to follow their newsfeeds,
    //       watch live streaming videos and be caught up on the latest happenings no matter where you are!
    //     </p>

    //     <p className="mt-2">
    //       The most important desktop features of Micple  are also available on the app, such as writing on timelines, liking photos, browsing for people, and editing your profile and groups.
    //     </p>

    //     <h3 className="mt-3">How Micple  Began</h3>
    //     <p className="mt-2">
    //       Micple began in February of 2018 as a online-based social network.
    //       It was created by IM Arifullah along with his team. Micple's success can be attributed to
    //       its ability to appeal to both people and businesses and its ability to interact with sites
    //       around the web by providing a single login that works across multiple sites.
    //     </p>

    //     <h3 className="mt-3">Why Users Like Micple </h3>

    //     <p className="mt-2">
    //       Micple is user-friendly and open to everyone.
    //       Even the least technical-minded people can sign up and begin posting on Micple.
    //       Although it started out as a way to keep in touch or reconnect with long-lost friends, it rapidly became the darling of businesses that were able to closely target an audience and deliver ads directly to the people most likely to want their products or services.
    //     </p>

    //     <p className="mt-2">
    //       Micple makes it simple to share photos, text messages, videos, status posts and feelings on Micple. The site is entertaining and a regular daily stop for many users.
    //     </p>

    //     <p className="mt-2">
    //       Unlike some social network sites, Micple does not allow adult content. When users transgress and are reported, they are banned from the site.
    //     </p>

    //     <p className="mt-2">
    //       Micple provides a customizable set of privacy controls, so users can protect their information from getting to third-party individuals.
    //     </p>

    //     <h5 className="mt-3">Key Features of Micple </h5>
    //     <p className="mt-2">Here are a few features that make Micple so popular:</p>
    //     <ul className="ul-design">
    //       <li ><strong>Watch:</strong> Here you can create content, live streaming, Video watching.</li>
    //       <li><strong>Store:</strong> Using it you can buy and sell any type of legally valid product.</li>
    //       <li><strong>Campaigns:</strong> There will be different types of tasks that the user can earn by completing.</li>
    //       <li><strong>Shortener: </strong>This allows you to shorten any type of URL. If the user wants, he can earn money through advertisement by shortening the URL.</li>
    //       <li><strong>Locker: </strong>It allows users to store any type of file, image, video, song, etc. Users can take membership if they want.</li>
    //       <li><strong>Shareplace:</strong> It allows the user to buy and sell any type of shares.</li>
    //       <li><strong>Looking for:</strong> Using it, the user can hire any user for any legally valid job.</li>
    //       <li><strong>Wallet:</strong> This allows the user to check his balance. You can make any kind of valid transaction through it. If the user wants, he can take master card from the company.</li>
    //       <li><strong>laboratory:</strong> You can do research on any subject through this feature. This feature allows users to buy and sell any research they want.</li>
    //       <li><strong>Assistant:</strong> With this feature the user can take any kind of virtual help.</li>
    //       <li><strong>Investor:</strong> With this feature, users can take or give donations from any user they want.</li>
    //     </ul>

    //     <h3 className="mt-3">Getting Started With Micple </h3>
    //     <p className="mt-2">
    //       If you want to see for yourself why visitors can't stay away from Micple, sign up for a free Micple  account online, add profile and cover photos, and search for people you know to start your friends list. You'll be part of the social media juggernaut before you know it.
    //     </p>

    //     <h3 className="mt-3">Why use Micple ?</h3>
    //     <p className="mt-2">
    //       Have you ever wondered why people like using Micple ?
    //       After all, there are already a lot of other ways to communicate online, like through email,
    //       instant messaging, and so on. What makes Micple unique is the ability to connect and
    //       share with the people you care about at the same time.
    //     </p>

    //     <p className="mt-2">
    //       For many, having a Micple  account is now an expected part of being online, much like having your own email address. And because Micple is so popular, other websites have worked to integrate Micple . This means you can use a single Micple account to sign in to different services across the Web.
    //     </p>

    //     <h3 className="mt-3">How does Micple sharing work?</h3>

    //     <p className="mt-2">
    //       Micple allows you to send messages and post status updates to keep in touch with friends and family.
    //       You can also share different types of content, like photos and links.
    //       But sharing something on Micple is a bit different from other types of online communication.
    //       Unlike email or instant messaging, which are relatively private, the things you share on Micple
    //       are more public, which means they'll usually be seen by many other people.
    //     </p>

    //     <p className="mt-2">
    //       While Micple offers privacy tools to help you limit who can see the things you share,
    //       it's important to understand that Micple  is designed to be more open and social than
    //       traditional communication tools. We'll talk more about sharing and controlling your privacy in
    //       our lessons on Micple privacy and adjusting privacy settings.
    //     </p>

    //     <h3 className="mt-3">Introduction</h3>
    //     <p className="mt-2">
    //       If you're thinking about joining Micple, this lesson will show you
    //       everything you need to get started. We'll explain some common Micple terms and how to
    //       create a Micple account. We'll also explore the Micple homepage, Timeline, and Micple  for mobile devices.
    //     </p>

    //     <h3 className="mt-3">Common Micple terms</h3>
    //     <p className="mt-2">
    //       Friends? Likes? Status updates? If you're new to Micple , there are a lot of terms and phrases that may seem a little confusing at first.
    //       Reviewing some of the most commonly used terms will give you a better understanding of how Micple  works and what to expect as you get started.
    //     </p>

    //     <h3 className="mt-3">Creating a Micple account</h3>
    //     <p className="mt-2">
    //       Before you can use Micple, you must create an account. Creating a Micple account is free. All you need to get started is an email address and a few minutes of your time.
    //     </p>

    //     <h6 className="mt-2">To create a Micple account:</h6>

    //     <p className="mt-1">
    //       1. Navigate to www.micple.com in your web browser.
    //     </p>
    //     <p className="mt-1">
    //       2. Under the words Sign Up, enter your personal information and desired password, then click Sign Up.
    //     </p>
    //     <p className="mt-1">
    //       3. You can then follow the directions on the screen to find friends, upload a profile picture, learn about privacy settings, and more.
    //     </p>
    //     <p className="mt-2">
    //       Before you can access all of Micple 's features, you'll need to confirm your email address. To do this, sign in to your email account, open the confirmation message from Micple , and click Confirm Your Account.
    //     </p>

    //     <h3 className="mt-3">Exploring Micple </h3>

    //     <p className="mt-2">
    //       Once you create an account, you'll want to spend a little time becoming familiar with the different parts of Micple, including the homepage and Timeline.
    //     </p>

    //     <h6 className="mt-2">The homepage</h6>
    //     <p className="mt-2">
    //       The homepage appears whenever you sign in to Micple. The homepage displays your News Feed, which shows the things your friends have shared on Micple. The homepage also allows you to navigate to other parts of Micple, such as your Timeline.
    //     </p>

    //     <h6 className="mt-2">The Timeline</h6>
    //     <p className="mt-2">
    //       The Timeline (also called your profile page) is where you'll share information about yourself. Whenever you post an update, it appears on your Timeline. Your friends can also share posts on your Timeline.
    //     </p>

    //     <h3 className="mt-3">Micple for mobile devices </h3>
    //     <p className="mt-2">
    //       Micple makes it easy to connect on the go. In fact, most Micple users primarily access the site from a mobile device. Micple offers an official mobile app on a variety of smartphones and tablets, including iOS and Android.
    //     </p>

    //     <p className="mt-2">
    //       You can use the mobile app to do just about everything you can do in the desktop version of Micple :
    //       post status updates and pictures, read stories and updates, and chat with friends. We'd like to give you
    //       a quick overview of the two most popular versions of the Micple app: Micple  for Android and Micple  for
    //       iPhone. While the interface for these apps is somewhat different,
    //       you'll notice that each app gives you access to the same basic features.
    //     </p>

    //     <p className="mt-2">
    //       If you don't have a smartphone, you may be able to access a limited version of Micple  on your phone through the Micple  for Every Phone program or Micple  texts.
    //     </p>

    //     <h3 className="mt-3">Understanding Micple  Privacy</h3>
    //     <h3 className="mt-2">Why is Micple privacy important?</h3>
    //     <p className="mt-2">
    //       If you choose to share things publicly on Micple , anyone with an account will be able to find and view your Micple  information, posts, and activity.
    //       This could impact your privacy in a variety of ways. For example:
    //     </p>

    //     <p className="mt-2">
    //       You could be sharing personal information you’d rather keep private, like your birth date or address.
    //     </p>

    //     <p className="mt-2">
    //       Anything you post, such as photos, comments, and status updates, will be visible to people you don’t know
    //     </p>
    //     <p className="mt-2">
    //       Embarrassing or unflattering posts could negatively affect your personal and professional reputation.
    //     </p>
    //     <p className="mt-2">
    //       Third-party websites and applications can access and share information from your Micple  account.
    //     </p>

    //     <h6 className="mt-3">Understanding basic privacy settings</h6>

    //     <p className="mt-2">
    //       Whenever you share something on Micple, you can choose who you'll share with. In the Micple, you can see the most common sharing options, including Only me, Lists, Friends, and Public.
    //     </p>

    //     <h3 className="mt-3">Sharing and privacy</h3>
    //     <p className="mt-2">
    //       Even if you customize your privacy settings, it's important to understand that the things you share on Micple are visible to a lot of other people. This is because Micple is designed to be more open and social than traditional communication tools.
    //     </p>

    //     <p className="mt-2">
    //       For example, let's say you post a photo on a friend's Timeline. By default, that photo will be visible to all of your friends on Micple, not just the person you shared it with. The photo will also be visible to anyone who is friends with your friend. This is one reason people enjoy using Micple —it's easy to share with lots of people at the same time.
    //     </p>

    //     <p className="mt-2">
    //       As long as you're somewhat careful about the things you share, Micple doesn't pose a serious risk to your privacy. Before you share anything on Micple, like a comment or status update, you'll need to consider how comfortable you are with many people seeing this information. If you wouldn't feel comfortable sharing something in a public place, you may not want to share it on Micple either.
    //     </p>

    //     <h3 className="mt-3">Micple privacy across the Web</h3>

    //     <p className="mt-2">
    //       You may not realize that your Micple account extends across the Web. The Micple Platform is a tool that lets other websites connect with your Micple account and view your public information. If you've ever seen an option to Login with Micple on another website, you've seen the Micple  Platform in action.
    //     </p>

    //     <p className="mt-2">
    //       When you visit a site that uses the Micple Platform, you're bringing all of your public information on Micple , including your name, gender, profile picture, and friends list. There are three other ways third-party websites can integrate your Micple account.
    //     </p>

    //     <h6 className="mt-3">Instant personalization</h6>
    //     <p className="mt-2">
    //       Instant personalization allows sites to personalize your experience while signed in to Micple. When a site uses instant personalization, it draws from the public information on your Timeline to predict the types of content you'll find interesting. For example, if you have liked reggae music on Micple, a music site like Pandora might suggest similar artists or show information about the music your friends listen to on the site.
    //     </p>

    //     <h6 className="mt-3">Social plug-ins</h6>
    //     <p className="mt-2">
    //       Social plug-ins are tools that let you easily share a site's content on Micple. On many websites, this will usually appear as a small Micple button. Social plug-ins can also show you content from the site that your friends have shared.
    //     </p>

    //     <h6 className="mt-3">Platform apps</h6>
    //     <p className="mt-2">
    //       Platform apps let you link your Micple account to an external site. When you add a platform app, you'll be able to use your Micple user name and password to sign in to that site. Your activity on that site may also appear on your Timeline. For instance, a music-sharing site might post information about the music you've listened to recently, while a news site could share the articles you've read.
    //     </p>

    //     <p className="mt-2">
    //       You can control how other sites work with your Micple account by changing your app settings. We'll explain how to do this in our lesson on adjusting privacy settings.
    //     </p>

    //     <h6 className="mt-3">Micple privacy for minors</h6>
    //     <p className="mt-2">
    //       Micple has several policies in place to help protect minors. For example, Children younger than 13 are not allowed to use Micple.
    //     </p>

    //     <p className="mt-2">
    //       Micple also offers extra privacy protections for users younger than 18. However, these protections aren't very strong. For example, minors do show up in public search results, and anyone can view their most basic information, including their names and profile pictures.
    //     </p>

    //     <p className="mt-2">
    //       Unless minors set privacy controls, their other personal information—including contact information, photos, and updates—can be viewed by their friends and their friends' friends, which includes people the minor may not know or wouldn't otherwise want viewing their information.
    //     </p>

    //     <p className="mt-2">
    //       We recommend that parents talk with their children about how to use Micple safely and help them set privacy controls that make sense.
    //     </p>

    //     <p className="mt-2">
    //       For a complete explanation of Micple 's privacy for minors, visit Micple 's Parents Portal. Also review Micple 's Data Policy for more detailed information on Micple  privacy.
    //     </p>

    //     <p className="mt-2">
    //       Now that you understand the basics of Micple privacy, you're ready to start using its privacy controls. You'll learn how to adjust all of the most important privacy settings in the next lesson.
    //     </p>

    //     <h3 className="mt-3">Adjusting Your Privacy Settings </h3>
    //     <h3 className="mt-2">Introduction</h3>

    //     <p className="mt-2">
    //       Even if you're an experienced Micple user, modifying your privacy settings for the first time can be a little confusing. And because Micple can change these options without much notice, it's important to review your privacy settings periodically. We'll talk about many of the privacy settings on Micple , explaining how they work and why they're important.
    //     </p>

    //     <h3 className="mt-3">Using Micple's privacy settings</h3>
    //     <p className="mt-2">
    //       However you use Micple, it's important to choose the privacy settings that will work best for you. Micple offers two main ways to control your privacy:
    //     </p>

    //     <ul className="sub-headline-ul-design">
    //       <li>You can apply privacy settings that set general rules about who can contact you and view your information.</li>
    //       <li>You can control who sees every individual thing you share.</li>
    //     </ul>

    //     <h6 className="mt-3">Privacy shortcuts</h6>
    //     <p className="mt-2">
    //       The fastest way to change your privacy settings is to use privacy shortcuts. To access privacy shortcuts, first click the Help Center button on the toolbar, then click Privacy Shortcuts. you can modify who sees your posts, block certain individuals, and perform a privacy checkup.
    //     </p>

    //     <h6 className="mt-3">The Privacy Settings and Tools page</h6>

    //     <p className="mt-2">
    //       Any changes you make from Privacy Shortcuts will be reflected on the Privacy Settings and Tools page. This is where you can control some of the most important privacy settings on Micple.
    //     </p>

    //     <h6 className="mt-3">To access the Privacy Settings and Tools page:</h6>
    //     <ul className="ul-design">
    //       <li>Click the drop-down arrow on the Toolbar, then select Settings.</li>
    //       <li>The Settings page will appear. Next, select Privacy. The Privacy Settings and Tools page will appear.</li>
    //     </ul>

    //     <h3 className="mt-3">The audience selector</h3>
    //     <p className="mt-2">
    //       In addition to your overall privacy settings, you can control who sees everything you share with the audience selector. This allows you to change your default privacy settings and make things more private or less private. If you change your mind later, you can go back and change the privacy level for that post at any time.
    //     </p>

    //     <h6 className="mt-3">To use the audience selector:</h6>
    //     <p className="mt-2">
    //       You'll see the audience selector across different parts of Micple, including in the Publisher and Timeline. In this example, we'll use the audience selector on the Publisher to share a status update.
    //     </p>

    //     <ul className="ul-design">
    //       <li>Click the audience selector.</li>
    //       <li>Choose the desired audience. In this example, we'll choose Public.</li>
    //       <li>Click Post to share with the selected audience.</li>
    //     </ul>

    //     <p className="mt-3">
    //       Keep in mind that modifying the audience selector will change the default audience setting for future posts. You should always double-check the audience selector before sharing anything on Micple.
    //     </p>

    //     <h3 className="mt-3">Timeline and tagging settings</h3>
    //     <p className="mt-2">
    //       A tag is a way to identify people on Micple by posting their names and a link to their individual Timelines. Your friends can tag you in photos and in other posts, including status updates. Anyone who can see these posts will be able to click the tag and view your Timeline. The tagged post will also be visible on your Timeline, your News Feed, and your friends' feeds.
    //     </p>

    //     <p className="mt-2">
    //       While tags make it easy to connect with your friends on Micple , your friends may occasionally tag you in posts you don't want to share. One way to prevent yourself from being tagged in potentially embarrassing photos and posts is to manage your tagging settings.
    //     </p>

    //     <p className="mt-2">The Activity Log</p>

    //     <p className="mt-2">
    //       If you ever need to review or modify what you've posted in the past, you can use the Activity Log. Every action you make on Micple —from posts to comments to likes—is recorded in the Activity Log. From here, it's easy to review your past activity. You'll also be able to manage posts your friends have shared on your Timeline, including the option to hide posts.
    //     </p>

    //     <h3 className="mt-3">Blocking unwanted communication</h3>

    //     <p className="mt-2">If you want to stop certain people from bothering you on Micple, you can block them. When you block someone, that person can no longer communicate with you or send friend requests.</p>

    //     <p className="mt-2">To access these settings, navigate to the Settings page, then select Blocking. From here, you can block users from contacting you on Micple. Just enter the name of the person you want to block, then click Block. </p>

    //     <h3 className="mt-3">Advertisements and your privacy</h3>

    //     <p className="mt-2">
    //       By default, Micple is allowed to use your information and activity in advertisements on Micple .
    //       Keep in mind that Micple 's advertising policies are complicated and can change without much notice.
    //       If you're not comfortable sharing this information with advertisers, we recommended blocking ads from
    //       accessing and displaying your information. To access these settings, navigate to the Settings page, then select Ads.
    //     </p>

    //     <h3 className="mt-3"> Sharing on Micple </h3>
    //     <h5 className="mt-2">Sharing on Micple </h5>

    //     <p className="mt-2">
    //       Micple is all about sharing with your friends. You can share a lot of things, such as status updates, photos, links, and even your location. You can also share something directly with your friends by posting on their Timelines.
    //     </p>

    //     <p className="mt-2">
    //       Before you share anything on Micple , you'll need to think about who you're sharing with. You can review our lessons on understanding Micple privacy and adjusting privacy settings to learn more.
    //     </p>

    //     <h5 className="mt-2">Sharing with the Publisher </h5>

    //     <p className="mt-2">
    //       You'll use the Publisher to share things with your friends. You can access the Publisher in two places:
    //     </p>

    //     <p className="mt-2">On your Timeline</p>
    //     <p className="mt-2">
    //       At the top of the News Feed on your homepage
    //     </p>

    //     <h5 className="mt-2">To post a status update:</h5>
    //     <p className="mt-2">
    //       One of the most common things people share on Micple is a status update—a short text-based post your friends can read and comment on. When you post a status update, it will appear on your Timeline, as well as on your friends' News Feeds.
    //     </p>
    //     <p className="mt-2">1. Type your status update in the Publisher on the News Feed or your Timeline.</p>
    //     <p className="mt-2">2. Check the audience selector to make sure you're sharing the post with the desired audience. In this example, we only want to share with our friends on Micple , so we'll leave this unchanged.</p>
    //     <p className="mt-2">3. Click Post. The status update will appear on your Timeline, on your News Feed, and on your friends' News Feeds.</p>

    //     <h3 className="mt-3">Posting on a friend's Timeline</h3>
    //     <p className="mt-2">If you want to share something with a friend, you can post it directly on that friend's Timeline. To do this, simply use the Publisher located on your friend's Timeline.</p>

    //     <p className="mt-2">
    //       Note that you cannot control privacy settings for the things you share on your friends' Timelines. For this reason, you should think carefully before posting anything that might be considered inappropriate or embarrassing. If you don't want other people to see your post, you can send your friend a private message instead.
    //     </p>

    //     <h5 className="mt-3">More types of sharing</h5>
    //     <p className="mt-2">Micple  allows you to share much more than just status updates. For example, you can share:</p>

    //     <div className="mt-3">
    //       <strong>Photos:</strong> It's easy to share your photos on Micple . Just click Photo/Video in the Publisher. You can then
    //       upload a photo from your computer, or upload several pictures at once to create a photo album.
    //     </div>
    //     <div className="mt-3">
    //       <strong>Links:</strong> You can share a link to an article on the Web by typing or pasting the link into the Publisher..
    //     </div>
    //     <div className="mt-3">
    //       <strong>Feeling/Activity:</strong> You can share how you're feeling or what you're currently up to by clicking the Feeling/Activity button in the Publisher. You can then choose from a variety of options and fill in the details.
    //     </div>
    //     <div className="mt-3">
    //       <strong>Location:</strong> You can share your physical location by clicking the More (...) button in the Publisher, then selecting Check In. You can then choose your current location from a list of nearby places.
    //     </div>

    //     <h5 className="mt-3">Likes, comments, and resharing</h5>
    //     <p className="mt-2">
    //       Sharing isn't limited to the things you post on Micple . You can also like, comment, and reshare the other posts and stories your friends share on Micple .
    //     </p>

    //     <h5 className="mt-3">Likes and reactions</h5>
    //     <p className="mt-2">
    //       Whenever your friends share something on Micple , you can choose to like the post. This is just a simple way of showing your friends that you enjoyed what they shared. To like a post, simply click the Like button.
    //     </p>

    //     <p className="mt-2">
    //       Instead of liking a post, you can respond with different illustrated emoticons, called reactions on Micple . To do this, hover your mouse over the Like button, then select the desired reaction. If you're using a mobile device, press and hold the Like button to choose a reaction.
    //     </p>

    //     <p className="mt-2">
    //       You can also like the Micple  page for businesses and organizations to receive updates about them in your News Feed.
    //     </p>

    //     <p className="mt-2">
    //       Note that any Micple  page you like can be posted to your Timeline and to your friends' News Feeds. This can be mildly embarrassing or revealing, depending on your interests.
    //     </p>

    //     <h5 className="mt-2">Comments</h5>
    //     <p className="mt-2">
    //       Whenever your friends share on Micple, you can leave a comment about their posts. Your friends will be able to see whenever you comment on something, as will the friends of the person who originally shared the post. To leave a comment, simply type it in the comment box below a post, then press Enter on your keyboard.
    //     </p>

    //     <h5 className="mt-3">Resharing friends' posts</h5>
    //     <p className="mt-2">
    //       Micple  makes it easy reshare the things your friends post. Just click Share at the bottom of a post to share it with your other friends.
    //     </p>

    //     <h5 className="mt-3">Social plug-ins</h5>

    //     <p className="mt-2">
    //       You'll probably find social plug-ins for Micple  across the Web on other websites. Social plug-ins will usually be represented by a small Micple  icon or Like button, which allow you to share something from the site on Micple  without leaving that page.
    //     </p>

    //     <h5 className="mt-3">To use social plug-ins:</h5>

    //     <ul className="ul-design">
    //       <li>If you find a social plug-in, click it to share that page on Micple.</li>
    //       <li>A Micple page will load. If you're not already signed in, enter your information and click Log In.</li>
    //       <li>Type something in the Publisher (if desired).</li>
    //       <li>Use the audience selector to decide who you'll share the post with.</li>
    //       <li>Click Share or Post to Micple . The post will be shared on Micple.</li>
    //     </ul>

    //     <h3 className="mt-3">Chat and Messages</h3>

    //     <h5 className="mt-2">Introduction</h5>

    //     <p className="mt-2">
    //       Micple chat and messages allow you to communicate privately with your friends on Micple . Unlike the other things you share on Micple, such as status updates or photos, chats and messages will not be shared with all of your friends or posted on your Timeline.
    //     </p>

    //     <h5 className="mt-2">Micple chat</h5>

    //     <p className="mt-2">
    //       You can communicate in real time with your friends using Micple chat. Also known as instant messaging, this is a popular way to communicate online.
    //     </p>

    //     <h5 className="mt-2">Sending messages with the Messages tab</h5>
    //     <p className="mt-2">
    //       You can also send messages to Micple friends via the Messages menu. This can be an easier way to find people if they're offline or if you're having trouble finding them in the chat box.
    //     </p>

    //     <h5 className="mt-3">To go offline:</h5>

    //     <p className="mt-2">
    //       Some people do not want to be available for chat while on Micple . You can hide your online status by going offline.
    //     </p>

    //     <h3 className="mt-3">Adjusting Your Account Settings</h3>
    //     <h5 className="mt-2">Account settings</h5>

    //     <p className="mt-2">
    //       Once you start using Micple , you may need to modify your account settings. These settings control things like your password and notifications. Changing these settings is optional, and you can modify them at any time.
    //     </p>

    //     <p className="mt-2">
    //       To modify your Account settings, click the drop-down arrow on the toolbar, then select Settings.
    //     </p>

    //     <h3 className="mt-3">Micple Texts</h3>

    //     <h5 className="mt-2">Micple texts</h5>

    //     <p className="mt-2">
    //       If you don't have a smartphone or if you don't have consistent Internet connectivity on your phone,
    //       you can still use Micple on the go with Micple texts. This feature allows you to post status updates and send messages by sending text messages from your phone. However, Micple  texts don't offer much other functionality—if
    //       you do have a smartphone, we strongly recommend using the Micple  mobile app instead.
    //     </p>

    //     <h3 className="mt-3">Deactivating Your Micple Account</h3>
    //     <h5 className="mt-2">Deactivating your Micple  account</h5>

    //     <p className="mt-2">
    //       If you decide that you no longer want to use Micple, it's easy to deactivate your account.
    //       When you deactivate your account, you're hiding all of your information on Micple. No one will be able to contact you on Micple or view the things you've shared, including your Timeline, status updates, and photos. If you decide that you'd like to return to Micple,
    //       you'll still be able to reactivate your account and recover your old information.
    //     </p>

    //     <h5 className="mt-2">Deleting your Micple  account</h5>

    //     <p className="mt-2">
    //       Deactivating your account does not fully delete it. When you deactivate your account, Micple  saves all of your settings, photos, and information in case you decide to reactivate your account. Your information isn't gone—it's just hidden. However, it is possible to delete your account permanently with no option for recovery.
    //     </p>

    //     <p className="mt-2">
    //       You should only do this if you are absolutely sure you want to permanently delete your Micple account.
    //     </p>

    //     <h3 className="mt-3"> Managing Your News Feed</h3>
    //     <h5 className="mt-2">Managing your News Feed</h5>

    //     <p className="mt-2">
    //       While Micple doesn't allow you to customize what stories you'll see first in your News Feed, it does offer some tools to help control what posts and updates can appear in it.
    //     </p>

    //     <h5 className="mt-2">Unfollowing and unfriending</h5>

    //     <p className="mt-2">
    //       If you ever decide that you'd like to stop seeing updates from certain friends, you can unfollow their posts. To unfollow a friend's posts, locate and select the drop-down arrow on a post, then select Unfollow. Even though you're unfollowing a person, note that you're still friends on Micple.
    //     </p>

    //     <p className="mt-2">
    //       If you no longer want to be friends with someone on Micple , you can go to that friend's Timeline and select Friends {'>'} Unfriend. This means you will no longer receive any updates from this person. It also means this person will no longer be able to see any of your nonpublic information.
    //     </p>
    //     <p className="mt-2">
    //       Likes and your News Feed
    //     </p>

    //     <p className="mt-2">
    //       Whenever you like something on Micple , you're also subscribing to a Micple  page.
    //     </p>

    //     <p className="mt-2">
    //       This means updates and advertisements from anyone or anything you've liked—including businesses, celebrities, bands, movies, and TV shows—can appear in your News Feed. If you frequently like things on Micple,
    //       your News Feed can easily become overwhelmed with advertisements rather than updates from your friends.
    //     </p>

    //     <p className="mt-2">
    //       To unsubscribe from a Micple page you've liked, locate and select the drop-down arrow on a post, then select Unfollow.
    //     </p>

    //     <h3 className="mt-3">Using Lists to Manage Sharing</h3>

    //     <h5 className="mt-2">All about lists</h5>

    //     <p className="mt-2">
    //       There may be times when you want to share with some—but not all—of your friends on Micple . For example, you might want to share some photos from a recent party, but you don't want your grandparents to see them. Or maybe you'd like to connect with friends from your job, but you're concerned about mixing your social and professional life.
    //     </p>

    //     <p className="mt-2">
    //       You can easily control who you share with by separating your friends into lists. Once you've created a list, you can choose to share certain things with only the people on that list. You can also share something with everyone except for a certain list of friends.
    //     </p>

    //     <h3 className="mt-3">Micple  Groups</h3>
    //     <h5 className="mt-2">All about groups</h5>

    //     <p className="mt-2">
    //       Let's say you're looking for an easy way to keep in touch with a small group of friends, like a book club or softball team. Rather than sharing with each friend separately, you could use a Micple group. It's easy to join an existing group or create your own. Groups make it easy for everyone to share with one another. For example, members of a group can:
    //     </p>

    //     <ul className="ul-design">
    //       <li>Notify other members about upcoming events</li>
    //       <li>Plan future events and meetings</li>
    //       <li>Share posts and photos with other members</li>
    //     </ul>

    //     <h5 className="mt-2">Types of groups</h5>
    //     <p className="mt-2">There are three types of groups on Micple , depending on the group's privacy settings:</p>
    //     <p className="mt-2">Open: Anyone can view the group, its members, and their posts</p>
    //     <p className="mt-2">Closed: Anyone can view the group and its members, but only members can see group posts.</p>
    //     <p className="mt-2">Secret: Only members can see the group or any of its information. People who are not members won't even be able to see that the group exists.</p>

    //     <h3 className="mt-3">Creating a Micple Page</h3>

    //     <h5 className="mt-2">What is a Micple page?</h5>

    //     <p className="mt-2">
    //       Many companies and organizations now use Micple Pages instead of creating their own websites, or as another way to connect with the people who use their services. A Page allows you to post basic information about your organization on Micple. Once you've created a Page, you can then invite people to like the Page and share posts and updates with them. Anyone who likes the Page can also leave reviews, ask questions, and more.
    //     </p>

    //     <h5 className="mt-2">Using a Micple page</h5>
    //     <p className="mt-2">
    //       After you create a Micple page, you'll be the only person who can edit the page information and post updates to the page's Timeline. However, if you'd like to give other people permission to do these things, you can add them as page administrators. To add a page administrator, click Settings near the top-right, then select Page Roles.
    //     </p>

    //     <h5 className="mt-2">Managing a Micple page</h5>
    //     <p className="mt-2">
    //       While there are many ways to manage a page, these tips should help you get started.
    //     </p>

    //     <p className="mt-2">
    //       <strong>Share responsibly:</strong> Just like with your personal Micple account,
    //       it's important to think before you share. A Micple page is a public face for your organization,
    //       so it’s best not to share anything that could be considered offensive or derogatory.
    //     </p>

    //     <p className="mt-2">
    //       <strong>Engage your audience:</strong> Many people create pages as a way to promote their businesses and post advertisements on Micple .
    //       While there's nothing wrong with using a Micple page this way, it's important to make sure the things you share will be relevant to the people who've liked your page. Posting constant advertisements and updates may become annoying to followers,
    //       which could lead them to unlike or unfollow your page.
    //     </p>

    //     <p className="mt-2">
    //       <strong>Experiment:</strong> There's no formula for creating a successful Micple page, so you'll want to try different things to see what works best for you and your audience.
    //       One suggestion is to spend some time reviewing more popular Micple pages. Pay attention to the types of posts they share, and see how they connect with their followers.
    //     </p>

    //     <h3 className="mt-3">Locked Out of Your Micple  Account?</h3>
    //     <h5 className="mt-2">Locked out of your Micple account?</h5>

    //     <p className="mt-2">
    //       There may be times when you go to sign in to Micple but can't seem to remember the email address or password you used when creating your account. Luckily, Micple makes it easy to recover your account information.
    //     </p>

    //     <p className="mt-2">
    //       However, you will need some sort of information to recover your account, whether it's your email address, phone number, or name.
    //     </p>

    //     <h3 className="mt-3">Micple News</h3>

    //     <h5 className="mt-2">Micple news</h5>
    //     <p className="mt-2">
    //       We've collected the most recent and important updates to Micple below. Whenever you hear about a recent or upcoming change, you'll find more information on it here.
    //     </p>

    //     <p className="mt-2">
    //       Keep in mind that Micple  tends to roll out changes slowly, so you won't always see these updates right away. It's also important to note that most new features are introduced on the desktop version before they're added to the mobile versions of Micple .
    //     </p>

    //     <h4 className='mt-3'>Contact us</h4>
    //     <p>You can contact us online or by writing to:</p>
    //     <strong>MICPLE Company Ltd.</strong>
    //     <p>Address: House: 161/A, Madhyapara, P.O. Khilkhet-1229, , Dhaka</p>
    //     <p>phone number:+8801976024630</p>
    //     <span>Email: <a href="manage@popular.website">manage@popular.website</a> </span>


    //   </div>
    // </div>
  );
}

export default About