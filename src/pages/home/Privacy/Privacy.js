import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import "./style.scss";

import axios from 'axios';
import { BACKEND_URL } from '../../../shared/constants/Variables';


const Privacy = () => {
  const [privacy, setPrivacy] = useState({});
  const location = useLocation();

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/admin-notes-public${location.pathname}`)
      .then(({ data }) => {
        setPrivacy(data.content);
      })
      .catch((err) => {
        console.log("something went wrong.")
      })

  }, []);

  return (


    <div className='privacy-policy-section '>

      <div className='terms-and-condition-container '>
        {
          Object.keys(privacy).length !== 0 ?
            <div className="about">
              <div
                className="ql-editor"
                dangerouslySetInnerHTML={{ __html: privacy }}
              />
            </div>
            : ""
        }
      </div>
    </div>

    // <div className='privacy-policy-section '>

    //   <div className='terms-and-condition-container '>


    //     <div>

    //       <h1 className='text-center'>Data Policy</h1>
    //       <p className='mt-2'>
    //         This policy describes the information that we process to support
    //         Micple Social media or search engine or the other products and services and features offered by Micple Platforms, Inc. (Micple Products or services).
    //         You can find additional tools and information in the Micple settings and Micple search engine settings.
    //       </p>

    //       <h3 className='text-center mt-3'>How do we use this information?</h3>

    //       <p className='mt-2'>
    //         We use the information that we have (subject to choices that you make) as described below and to provide and support the Micple Products and related services described in the Micple Terms and Micple Terms. Here's how:
    //       </p>

    //       <h3 className='text-center mt-3'>Provide, personalise and improve our Products</h3>

    //       <p className='mt-2'>
    //         We use the information that we have to deliver our Products, including to personalise features and content
    //         (including your ads, Micple News Feed, Micple feed and Micple Stories) and make suggestions for you (such as groups or events that you may be
    //         interested in or topics that you may want to follow) on and off our Products. To create personalised Products that are unique and relevant to you, we use your
    //         connections, preferences, interests and activities based on the data that we collect and learn from you and others (including any data with special protections you choose
    //         to provide); how you use and interact with our Products; and the people, places or things that you're connected to and interested in on and off our Products.
    //         Learn more about how we use information about you to personalise your Micple and Micple experience, including features, content and recommendations in Micple Products;
    //         you can also learn more about how we choose the ads that you see.
    //       </p>

    //       <h3 className='text-center mt-3'>Product research and development</h3>

    //       <p className='mt-2'>
    //         We use the information we have to develop, test and improve our Products, including by conducting surveys and research, and testing and troubleshooting new products and features.
    //       </p>

    //       <h3 className='text-center mt-3'>Ads and other sponsored content</h3>

    //       <p className='mt-2'>
    //         Ads and other sponsored content
    //         We use the information we have about you – including information about your interests, actions and connections – to select and personalise ads, offers and other sponsored content that we show you. Learn more about how we select and personalise ads, and your choices over the data we use to select ads and other sponsored content for you in the Micple Settings and Micple  platforms Settings.
    //       </p>

    //       <h3 className='text-center mt-3'>Information across Micple Products and devices</h3>

    //       <p className='mt-2'>
    //         We connect information about your activities on different Micple Products and devices to provide a more tailored and consistent experience on all Micple Products that you use, wherever you use them. For example, we can suggest that you join a group on Micple that includes people you follow on Micple or communicate with using Messenger. We can also make your experience more seamless,
    //         for example, by automatically filling in your registration information (such as your phone number) from one Micple Product when you sign up for an account on a different Product.
    //       </p>

    //       <h3 className='text-center mt-3'>Location-related information</h3>

    //       <p className='mt-2'>
    //         We use location-related information – such as your current location, where you live, the places you like to go,
    //         and the businesses and people you're near – to provide, personalise and improve our Products, including ads, for you and others. Location-related
    //         information can be based on things such as precise device location
    //         (if you've allowed us to collect it), IP addresses and information from your and others' use of Micple Products (such as check-ins or events that you attend).
    //       </p>

    //       <h3 className='text-center mt-3'>Providing measurement, analytics and other business services</h3>

    //       <p className='mt-2'>
    //         We use the information that we have (including your activity off our Products, such as the websites you visit and ads you see) to help advertisers and other partners measure the effectiveness and distribution of their ads and services,
    //         and understand the types of people who use their services and how people interact with their websites, apps and services. Learn how we share information with these partners.
    //       </p>


    //       <h3 className='text-center mt-3'>Promoting safety, integrity and security</h3>

    //       <p className='mt-2'>
    //         We use the information that we have to verify accounts and activity, combat harmful conduct, detect and prevent spam and other bad experiences,
    //         maintain the integrity of our Products, and promote safety and security on and off of Micple Products. For example, we use data that we have to investigate
    //         suspicious activity or violations of our Terms or Policies, or to detect when someone needs help. To learn more, visit the Micple Security Help Centre and Micple Security Tips.
    //       </p>

    //       <h3 className='text-center mt-3'>Researching and innovating for social good</h3>

    //       <p className='mt-2'>
    //         We use the information that we have (including from research partners we collaborate with) to conduct and
    //         support research and innovation on topics of general social welfare, technological advancement, public interest, health and well-being.
    //         For example, we analyze information we have about migration patterns during crises to aid relief efforts. Learn more about our research programmes.
    //       </p>

    //       <h3 className='text-center mt-3'>Communicate with you</h3>

    //       <p className='mt-2'>
    //         We use the information that we have to send you marketing communications,
    //         communicate with you about our Products and let you know about our Policies and Terms. We also use your information to respond to you when you contact us.
    //       </p>

    //       <h3 className='text-center mt-3'>How is this information shared?</h3>
    //       <h3 className='text-center mt-1'>Your information is shared with others in the following ways</h3>

    //       <h2 className='text-center mt-4'>Content that others share or reshare about you</h2>

    //       <p className='mt-2'>
    //         You should consider who you choose to share with, because people who can see your activity on our Products can choose to share it with others on and off our Products,
    //         including people and businesses outside the audience that you shared with. For example, when you share a post or send a message to specific friends or accounts, they can download,
    //         screenshot or reshare that content to others across or off our Products, in person or in virtual reality experiences Also, when you comment on someone else's post or react to their
    //         content, your comment or reaction is visible to anyone who can see the other person's content, and that person can change the audience later.
    //       </p>

    //       <p className='mt-3'>
    //         People can also use our Products to create and share content about you with the audience they choose.
    //         For example, people can share a photo of you in a story, mention or tag you at a location in a post, or share information about you in their posts or messages.
    //         If you are uncomfortable with what others have shared about you on our Products, you can learn how to report the content.
    //       </p>

    //       <h3 className='text-center mt-3'>Sharing on Micple Products</h3>
    //       <h3 className='text-center mt-2'>People and accounts that you share and communicate with</h3>

    //       <p className='mt-3'>
    //         When you share and communicate using our Products, you choose the audience for what you share.
    //         For example, when you post on Micple, you select the audience for the post, such as a group, all of your friends, the public or a customized list of people.
    //       </p>

    //       <p className='mt-2'>
    //         Similarly, when you use Messenger or Micple to communicate with people or businesses,
    //         those people and businesses can see the content you send. Your network can also see actions that you have taken on our Products,
    //         including engagement with ads and sponsored content. We also let other accounts see who has viewed their Micple or Micple Stories.
    //         Public information can be seen by anyone, on or off our Products, including if they don't have an account. This includes your Micple username,
    //         any information you share with a public audience, information in your public profile on Micple, and content you share on a Micple Page, public Micple account or any other public forum,
    //         such as Micple Marketplace. You, other people using Micple and Micple and we can provide access to or send public information to anyone on or off our Products,
    //         including in other Micple Company Products, in search results or through tools and APIs. Public information can also be seen, accessed, reshared or downloaded through
    //         third-party services such as search engines, APIs and offline media such as TV, and by apps, websites and other services that integrate with our Products. Learn more about what
    //         information is public and how to control your visibility on Social media or search engine or the other products and services.
    //       </p>

    //       <h3 className='text-center mt-3'>Information about your active status or presence on our Products</h3>

    //       <p className='mt-2'>
    //         People in your networks can see signals telling them whether you are active on our Products,
    //         including whether you are currently active on Micple, Messenger or Micple social media, or when you last used our Products.
    //       </p>

    //       <h3 className='text-center mt-3'>Apps, websites and third-party integrations on or using our Products</h3>

    //       <p className='mt-3'>
    //         When you choose to use third-party apps, websites or other services that use, or are integrated with,
    //         our Products, they can receive information about what you post or share. For example, when you play a game with your Micple friends or use a Micple Comment or
    //         Share button on a website, the game developer or website can receive information about your activities in the game or receive a comment or link that you share from
    //         the website on Micple. Also, when you download or use such third-party services, they can access your public profile on Micple,
    //         and any information that you share with them. Apps and websites that you use may receive your list of Micple friends if you choose to share it with them.
    //       </p>

    //       <p className='mt-2'>
    //         But apps and websites that you use will not be able to receive any other information about your Micple friends from you,
    //         or information about any of your Micple followers (although your friends and followers may, of course, choose to share this information themselves).
    //         Information collected by these third-party services is subject to their own terms and policies, not this one. Devices and operating systems providing
    //         native versions of Micple social media  and Micple search engine service (i.e. where we have not developed our own first-party apps) will have access to all information that
    //         you choose to share with them, including information that your friends share with you, so that they can provide our core functionality to you.
    //       </p>

    //       <p className='mt-2' style={{ fontStyle: "italic" }}>
    //         Note: We are in the process of restricting developers' data access even further to help prevent abuse. For example, we will remove developers' access to your Micple and Micple data if you haven't used their app in three months, and we are changing login, so that in the next version, we will
    //         reduce the data that an app can request without app review to include only name, Micple username and bio, profile photo and email address. Requesting any other data will require our approval.
    //       </p>

    //       <h3 className='text-center mt-3'>New owner</h3>

    //       <p className='mt-2'>
    //         If the ownership or control of all or part of our Products or their assets changes, we may transfer your information to the new owner.
    //       </p>

    //       <h3 className='text-center mt-3'>Partners who use our analytics services</h3>

    //       <p className='mt-2'>
    //         We provide aggregated statistics and insights that help people and businesses understand how people are engaging with their posts, listings, Micple Pages, videos and other content on and off the Micple Products. For example, Micple Page admins and Micple business profiles receive information about the number of people or accounts who viewed, reacted to or commented on their posts, as well as aggregate demographic and other information that helps them understand interactions with their account or Micple Page.
    //       </p>

    //       <h3 className='text-center mt-3'>Sharing with third-party partners</h3>

    //       <p className='mt-2'>
    //         We work with third-party partners who help us and improve our Products or who use Micple Business Tools to grow their businesses,
    //         which makes it possible to operate our companies and provide free services to people around the world. We don't sell any of your information to anyone and we never will.
    //         We also impose strict restrictions on how our partners can use and disclose the data we provide. Here are the types of third parties that we share information with-
    //       </p>

    //       <h3 className='text-center mt-3'>Advertisers</h3>

    //       <p className='mt-2'>
    //         We provide advertisers with reports about the kinds of people seeing their ads and how their ads are performing,
    //         but we don't share information that personally identifies you (information such as your name or email address that by itself can be used to contact you or identifies who you are)
    //         unless you give us permission. For example, we provide general demographic and interest information for advertisers
    //         (for example, that an ad was seen by a woman between the ages of 25 and 34 who lives in India and likes software engineering)
    //         to help them better understand their audience. We also confirm which ads led you to make a purchase or take an action with an advertiser.
    //       </p>

    //       <h3 className='text-center mt-3'>Measurement partners</h3>

    //       <p className='mt-2'>
    //         We share information about you with companies that aggregate it to provide analytics and measurement reports to our partners.
    //       </p>

    //       <h3 className='text-center mt-3'>Vendors and service providers</h3>

    //       <p className='mt-2'>
    //         We provide information and content to vendors and service providers who support our business,
    //         such as by providing technical infrastructure services, analyzing how our Products are used, providing customer service, facilitating payments or conducting surveys.
    //       </p>

    //       <h3 className='text-center mt-3'>Partners offering goods and services in our Products</h3>
    //       <p className='mt-2'>
    //         When you subscribe to receive premium content, or buy something from a seller in our Products,
    //         the content creator or seller can receive your public information and other information that you share with them, as well as the information needed to complete
    //         the transaction, including shipping and contact details.
    //       </p>

    //       <h3 className='text-center mt-3'>Researchers and academics</h3>
    //       <p className='mt-2'>
    //         We also provide information and content to research partners and academics to conduct research that advances scholarship and innovation that supports
    //         our business or mission and enhances discovery and innovation on topics of general social welfare, technological advancement, public interest, health and well-being.
    //       </p>

    //       <h3 className='text-center mt-3'>Law enforcement or legal requests</h3>

    //       <p className='mt-2'>
    //         We share information with law enforcement or in response to legal requests in the circumstances outlined below.
    //         Learn more about how you can control the information about you that you or others share with third-party partners in the Micple settings and Micple search engine service settings.
    //       </p>

    //       <h3 className='text-center mt-3'>What kinds of information do we collect?</h3>

    //       <p className='mt-2'>
    //         To provide the Micple Products, we must process information about you. The type of information that we collect depends on how you use our Products.
    //         You can learn how to access and delete information that we collect by visiting the Micple settings and Micple Social media settings.
    //       </p>

    //       <h3 className='text-center mt-3'>Things that you and others do and provide</h3>
    //       <h3 className='text-center mt-3'>Information and content you provide</h3>

    //       <p className='mt-3'>
    //         We collect the content, communications and other information you provide when you use our Products, including when you sign up for an account, create or share content and message or communicate with others. This can include information in or about the content that you provide (e.g. Micple data), such as the location of a photo or the date a file was created. It can also include what you see through features that we provide, such as our camera, so we can do things such as suggest masks and filters that you might like, or give you tips on using camera formats. Our systems automatically process content and communications that you and others provide to analyze context and what's in them for the purposes described below. Learn more about how you can control who can see the things you share.
    //       </p>


    //       <h3 className='text-center mt-3'>Your usage</h3>

    //       <p className='mt-2'>
    //         We collect information about how you use our Products, such as the types of content that you view or engage with, the features you use,
    //         the actions you take, the people or accounts you interact with and the time, frequency and duration of your activities. For example, we log when you're
    //         using and have last used our Products, and what posts, videos and other content you view on our Products. We also collect information about how you use features such as our camera.
    //       </p>

    //       <h3 className='text-center mt-3'>Data with special protections</h3>

    //       <p className='mt-2'>
    //         You can choose to provide information in your Micple profile fields or life events about your religious views, political views, who you are "interested in" or your health.
    //         This and other information (such as racial or ethnic origin, philosophical beliefs or trade union membership) could be subject to special protections under the laws of your country.
    //       </p>


    //       <h3 className='text-center mt-3'>Information about transactions made on our Products</h3>

    //       <p className='mt-2'>
    //         If you use our Products for purchases or other financial transactions (such as when you make a purchase in a game or make a donation),
    //         we collect information about the purchase or transaction. This includes payment information,
    //         such as your credit or debit card number and other card information, other account and authentication information, and billing, delivery and contact details.
    //       </p>

    //       <h3 className='text-center mt-3'>Things others do and information they provide about you</h3>

    //       <p className='mt-2'>
    //         We also receive and analyse content, communications and information that other people provide when they use our Products.
    //         This can include information about you, such as when others share or comment on a photo of you, send a message to you or upload, sync or import your contact information.
    //       </p>

    //       <p className='mt-2'>
    //         Networks and connections: We collect information about the people, accounts, hashtags,
    //         Micple groups and Pages that you are connected to and how you interact with them across our Products, such as people you communicate with the most or groups that you are part of.
    //         We also collect contact information if you choose to upload, sync or import it from
    //         a device (such as an address book or call log or SMS log history), which we use for things such as helping you and others find people you may know and for the other purposes listed below.
    //       </p>


    //       <h3 className='text-center mt-3'>Device information</h3>

    //       <p className='mt-2'>
    //         As described below, we collect information from and about the computers, phones,
    //         connected TVs and other web-connected devices you use that integrate with our Products, and we combine this information across different devices that you use.
    //         For example, we use information collected about your use of our Products on your phone to better personalize the content (including ads) or features that you see when
    //         you use our Products on another device, such as your laptop or tablet, or to measure whether you took an action in response to an ad that we showed you on your phone on a different device.
    //       </p>

    //       <h3 className='text-center mt-3'>Information that we obtain from these devices includes</h3>
    //       <h3 className='text-center mt-3'>Device attributes</h3>

    //       <p className='mt-3'>
    //         Information such as the operating system, hardware and software versions, battery level, signal strength, available storage space, browser type, app and file names and types, and plugins.
    //       </p>

    //       <h3 className='text-center mt-3'>Network and connections</h3>
    //       <p className='mt-3'>
    //         information such as the name of your mobile operator or ISP, language, time zone, mobile phone number, IP address,
    //         connection speed and, in some cases, information about other devices that are nearby or on your network, so we can do things such as help you stream a video from your phone to your TV.
    //       </p>

    //       <h3 className='text-center mt-3'>Device operations</h3>
    //       <p className='mt-3'>
    //         Information about operations and behaviours performed on the device, such as whether a window is in the foreground or background, or mouse movements (which can help distinguish humans from bots).
    //       </p>

    //       <h3 className='text-center mt-3'>Device operations</h3>

    //       <p className='mt-3'>
    //         Information about operations and behaviours performed on the device, such as whether a window is in the foreground or background, or mouse movements (which can help distinguish humans from bots).
    //       </p>

    //       <h3 className='text-center mt-3'>Device signals</h3>

    //       <p className='mt-3'>
    //         Bluetooth signals, information about nearby Wi-Fi access points, beacons and mobile phone masts.
    //       </p>


    //       <h3 className='text-center mt-3'>Device signals</h3>
    //       <p className='mt-2'>
    //         Bluetooth signals, information about nearby Wi-Fi access points, beacons and mobile phone masts.
    //       </p>

    //       <h3 className='text-center mt-3'>Data from device settings</h3>
    //       <p className='mt-2'>
    //         Information you allow us to receive through device settings that you turn on, such as access to your GPS location, camera or photos.
    //       </p>

    //       <h3 className='text-center mt-3'>Data from device settings</h3>

    //       <p className='mt-2'>
    //         Information you allow us to receive through device settings that you turn on, such as access to your GPS location, camera or photos.
    //       </p>

    //       <h3 className='text-center mt-3'>Cookie data</h3>

    //       <p className='mt-2'>
    //         Data from cookies stored on your device, including cookie IDs and settings. Learn more about how we use cookies in the Micple Cookies Policy and Micple Cookies Policy.
    //       </p>

    //       <h3 className='text-center mt-3'>Identifiers</h3>

    //       <p className='mt-2'>
    //         Unique identifiers, device IDs and other identifiers,
    //         such as from games, apps or accounts that you use, and Family Device IDs (or other identifiers unique to Micple Company Products associated with the same device or account).
    //       </p>


    //       <h3 className='text-center mt-3'>Information from partners</h3>

    //       <p className='mt-2'>
    //         Advertisers, app developers and publishers can send us information through Micple Business Tools that they use,
    //         including our social plug-ins (such as the Like button), Micple Login, our APIs and SDKs or the Micple pixel.
    //         These partners provide information about your activities off of our Products – including information about your device, websites you visit, purchases you make,
    //         the ads you see and how you use their services – whether or not you have an account or are logged in to our Products. For example, a game developer could use our API to tell us
    //         what games you play, or a business could tell us about a purchase you made in its shop.
    //         We also receive information about your online and offline actions and purchases from third-party data providers who have the rights to provide us with your information.
    //       </p>

    //       <p className='mt-2'>
    //         Partners receive your data when you visit or use their services, or through third parties that they work with. We require each of these partners to have lawful rights to collect, use and share your data before providing us with any data. Learn more about the types of partners we receive data from.
    //       </p>

    //       <p className='mt-2'>
    //         To learn more about how we use cookies in connection with Micple Business Tools, review the Micple Cookies Policy and Micple Cookies Policy.
    //       </p>

    //       <h3 className='text-center mt-3'>How do we operate and transfer data as part of our global services?</h3>

    //       <p className='mt-3'>
    //         We share information globally, both internally within the Micple Companies, and externally with our partners and with those you connect and share with
    //         around the world in accordance with this policy. Your information may, for example, be transferred or transmitted to, or stored and processed in the Bangladesh or other countries
    //         outside of where you live for the purposes as described in this Policy. These data transfers are necessary to provide the services set forth in the Micple Terms and Micple Social media or
    //         search engine  Terms and to globally operate and provide our Products to you. We utilise standard contract clauses,
    //         rely on the European Commission's adequacy decisions about certain countries, as applicable, and obtain your consent for these data transfers to the Bangladesh and other countries.
    //       </p>


    //       <h3 className='text-center mt-3'>How can I manage or delete information about me?</h3>

    //       <p className='mt-2'>
    //         We provide you with the ability to access, rectify, port and delete your data. Learn more in your Micple social media settings and Micple search engine settings.
    //         When you delete your account, we delete things that you have posted, such as your photos and status updates, and you won't be able to recover that information later.
    //         Information that others have shared about you isn't part of your account and won't be deleted. If you don't want to delete your account but want to temporarily stop using the Products,
    //         you can deactivate your account instead. To delete your account at any time, please visit the Micple social media settings and Micple search engine settings.
    //       </p>

    //       <p className='mt-2'>
    //         We store data until it is no longer necessary to provide our services and Micple Products, or until your account is deleted – whichever comes first.
    //         This is a case-by-case determination that depends on things such as the nature of the data, why it is collected and processed, and relevant legal or operational retention needs.
    //         For example, when you search for something on Micple, you can access and delete that query from within your search history at any time, but the log of that search is deleted after six months.
    //         If you submit a copy of your government-issued ID for account verification purposes,
    //         we delete that copy 30 days after review, unless otherwise stated. Learn more about deletion of content that you have shared and cookie data obtained through social plugins.
    //       </p>

    //       <h3 className='text-center mt-3'>How do we respond to legal requests or prevent harm?</h3>
    //       <h3 className='text-center mt-3'>We access, preserve and share your information with regulators,</h3>
    //       <h3 className='text-center mt-3'>law enforcement or others</h3>

    //       <p className='mt-2'>
    //         In response to a legal request (e.g. a search warrant, court order or subpoena) if we have a good-faith belief that the law requires us to do so.
    //         This may include responding to legal requests from jurisdictions outside of the Bangladesh
    //         when we have a good-faith belief that the response is required by law in that jurisdiction, affects users in that jurisdiction and is consistent with internationally recognised standards.
    //       </p>

    //       <p className='mt-2'>
    //         When we have a good-faith belief that it is necessary to: detect, prevent and address fraud, unauthorised use of the Products,
    //         breaches of our Terms or Policies, or other harmful or illegal activity; to protect ourselves (including our rights, property or Products), you or others,
    //         including as part of investigations or regulatory enquiries; or to prevent death or imminent bodily harm. For example, if relevant,
    //         we provide information to and receive information from third-party partners about the reliability of your account to prevent fraud, abuse and other harmful activity on and off our Products.
    //       </p>

    //       <p className='mt-2'>
    //         Information that we receive about you (including financial transaction data related to purchases made on our Products)
    //         can be accessed and preserved for an extended period when it is the subject of a legal request or obligation, governmental investigation or
    //         investigations of possible violations of our terms or policies, or otherwise to prevent harm.
    //         We also retain information from accounts disabled for term breaches for at least a year to prevent repeat abuse or other term breaches.
    //       </p>

    //       <h3 className='text-center mt-3'>CCPA Privacy Rights (Do Not Sell My Personal Information)</h3>

    //       <p className='mt-2'>Under the CCPA, among other rights, California consumers have the right to:</p>
    //       <p className='mt-2'>Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</p>
    //       <p className='mt-2'>Request that a business delete any personal data about the consumer that a business has collected.</p>
    //       <p className='mt-2'>Request that a business that sells a consumer's personal data, not sell the consumer's personal data.</p>
    //       <p className='mt-2'>If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</p>

    //       <h3 className='text-center mt-3'>GDPR Data Protection Rights</h3>

    //       <p className='mt-2'>We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:</p>
    //       <p className='mt-2'>The right to access – You have the right to request copies of your personal data. We may charge you a small fee for this service.</p>
    //       <p className='mt-2'>The right to rectification – You have the right to request that we correct any information you believe is inaccurate.
    //         You also have the right to request that we complete the information you believe is incomplete.</p>
    //       <p className='mt-2'>The right to erasure – You have the right to request that we erase your personal data, under certain conditions.</p>
    //       <p className='mt-2'>The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.</p>
    //       <p className='mt-2'>The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.</p>
    //       <p className='mt-2'>The right to data portability – You have the right to request that we transfer the data that
    //         we have collected to another organization, or directly to you, under certain conditions.
    //       </p>
    //       <p className='mt-2'>If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</p>

    //       <h3 className='text-center mt-3'>How do the Micple Companies work together?</h3>

    //       <p className='mt-2'>
    //         Micple social media and Micple search engine service share infrastructure, systems and technology with other Micple Companies to provide an innovative,
    //         relevant, consistent and safe experience across all Micple Company Products that you use. We also process information about you across the Micple Companies for these purposes,
    //         as permitted by applicable law and in accordance with their terms and policies. For example, we process information from Micple social media about accounts sending spam on its service
    //         so we can take appropriate action against those accounts on Micple, Micple search engine or Messenger.
    //         We also work to understand how people use and interact with Micple Company Products, such as understanding the number of unique users on different Micple Company Products.
    //       </p>

    //       <h3 className='text-center mt-3'>How will we notify you of changes to this Policy?</h3>

    //       <p className='mt-2'>
    //         We'll notify you before we make changes to this Policy and give you the opportunity to review the revised Policy before you choose to continue using our Products.
    //       </p>

    //       <h3 className='text-center mt-3'>Cookies and other storage technologies</h3>

    //       <p className='mt-2'>
    //         Cookies are small pieces of text used to store information on web browsers.
    //         Cookies are used to store and receive identifiers and other information on computers, phones and other devices.
    //         Other technologies, including data that we store on your web browser or device, identifiers associated with your device and other software, are used for similar purposes.
    //       </p>

    //       <p className='mt-2'>
    //         In this policy, we refer to all of these technologies as "cookies".
    //       </p>

    //       <p className='mt-2'>
    //         We use cookies if you have a Micple account, use the Micple Products, including our website and apps, or visit other
    //         websites and apps that use the Micple Products (including the Like button). Cookies enable Micple to offer the Micple Products to you and to understand the information
    //         that we receive about you, including information about your use of other websites and apps, whether or not you are registered or logged in.
    //       </p>

    //       <p className='mt-2'>
    //         This policy explains how we use cookies and the choices you have. Except as otherwise stated in this policy, the Data Policy will apply to our processing of the data that we collect via cookies.
    //       </p>


    //       <h3 className='text-center mt-3'>Where do we use cookies?</h3>

    //       <p className='mt-2'>
    //         We may place cookies on your computer or device and receive information stored in cookies when you use or visit The Micple Products;
    //         Products provided by other members of the Micple Companies; and Websites and apps provided by other companies that use the Micple Products,
    //         including companies that incorporate Micple technologies into their websites and apps. Micple uses cookies and receives information when you visit those sites and apps,
    //         including device information and information about your activity, without any further action from you. This occurs whether or not you have a Micple account or are logged in.
    //       </p>

    //       <h3 className='text-center mt-3'>Do other Companies use cookies in connection with the Micple </h3>
    //       <h3 className='text-center mt-3'>Products?</h3>

    //       <p className='mt-2'>
    //         Yes, other companies use cookies on the Micple Products to provide advertising, measurement, marketing and analytics services to us, and to provide certain features and improve our services for you.
    //         For example, other companies' cookies help tailor ads off Micple Products, measure their performance and effectiveness and support marketing and analytics. Certain features on the Micple Products use
    //         cookies from other companies to function, for example, certain maps, payment and security features. Learn more about the companies that use cookies on the Micple Products. <br />
    //         Third-party companies also use cookies on their own sites and apps in connection with the Micple Products. To understand how other companies use cookies, please review their policies.

    //       </p>

    //       <h3 className='text-center mt-3'>Why do we use cookies?</h3>

    //       <p className='mt-2'>
    //         Cookies help us provide, protect and improve the Micple Products, such as by personalising content,
    //         tailoring and measuring ads, and providing a safer experience. The cookies that we use include session cookies, which are deleted when you close your browser,
    //         and persistent cookies, which stay in your browser until they expire or you delete them.
    //         While the cookies that we use may change from time to time as we improve and update the Micple Products, we use them for the following purposes:
    //       </p>

    //       <h3 className='text-center mt-3'>Advertising, recommendations, insights and measurement</h3>
    //       <p className='mt-2'>
    //         We use cookies to help us show ads and to make recommendations for businesses and other organizations to people who may be interested in the products, services or causes they promote.
    //       </p>
    //       <p>
    //         For example: Cookies allow us to help deliver ads to people who have previously visited a business's website,
    //         purchased its products or used its apps and to recommend products and services based on that activity. Cookies also allow us to limit the number of times
    //         that you see an ad so you don't see the same ad over and over again.
    //         For example, the "fr" cookie is used to deliver, measure and improve the relevancy of ads, with a lifespan of 90 days.
    //       </p>
    //       <p>
    //         We also use cookies to help measure the performance of ad campaigns for businesses that use the Micple Products.
    //       </p>
    //       <p>
    //         For example: We use cookies to count the number of times that an ad is shown and to calculate the cost of those ads.
    //         We also use cookies to measure how often people do things, such as make a purchase following an ad impression.
    //       </p>

    //       <p className='mt-2'>
    //         Cookies help us serve and measure ads across different browsers and devices used by the same person.
    //         For example: We can use cookies to prevent you from seeing the same ad over and over again across the different devices that you use
    //       </p>

    //       <p>
    //         Cookies also allow us to provide insights about the people who use the Micple Products,
    //         as well as the people who interact with the ads, websites and apps of our advertisers and the businesses that use the Micple Products.
    //       </p>
    //       <p>
    //         For example: We use cookies to help businesses understand the kinds of people who like their Micple social media or use their apps so that they can provide more relevant content
    //         and develop features that are likely to be interesting to their customers.
    //       </p>

    //       <p>
    //         We also use cookies to help you opt out of seeing ads from Micple based on your activity on third-party websites.
    //         Learn more about the information we receive, how we decide which ads to show you on and off the Micple Products and the controls that are available to you.
    //       </p>

    //       <h3 className='text-center mt-3'>Performance</h3>

    //       <p className='mt-2'>
    //         We use cookies to provide you with the best experience possible.
    //       </p>
    //       <p>
    //         For example: Cookies help us route traffic between servers and understand how quickly Micple Products load for different people.
    //         Cookies also help us record the ratio and dimensions of your screen and windows and know whether you've enabled high-contrast mode, so that we can render our sites and apps correctly.
    //       </p>

    //       <h3 className='text-center mt-3'>Analytics and research</h3>

    //       <p className='mt-2'>
    //         We use cookies to better understand how people use the Micple Products so that we can improve them.
    //         For example: Cookies can help us understand how people use the Micple service, analyse which parts of our Products people find most useful and engaging, and identify features that could be improved.
    //       </p>

    //       <h3 className='text-center mt-3'>Authentication</h3>

    //       <p className='mt-2'>
    //         We use cookies to verify your account and determine when you're logged in so that we can make it easier for you to access the Micple Products and show you the appropriate experience and features.
    //       </p>
    //       <p>
    //         For example: We use cookies to keep you logged in as you navigate between Micple Pages.
    //         Cookies also help us remember your browser so you don't have to keep logging in to Micple and so you can more easily log in to Micple via third-party apps and websites.
    //         For example, we use the "c_user" and "xs" cookies, including for this purpose, which have a lifespan of 365 days.
    //       </p>

    //       <h3 className='text-center mt-3'>Security, site and product integrity</h3>

    //       <p className='mt-2'>
    //         We use cookies to help us keep your account, data and the Micple Products safe and secure.
    //       </p>
    //       <p >
    //         For example: Cookies can help us identify and impose additional security measures when someone may be attempting to access a Micple account without authorisation,
    //         for instance, by rapidly guessing different passwords. We also use cookies to store information that allows us to recover your account in the event that you forget your password,
    //         or to require additional authentication if you tell us that your account has been hacked. We also use cookies to combat activity that violates our policies or otherwise degrades
    //         our ability to provide the Micple Products.
    //       </p>
    //       <p>
    //         For example: Cookies help us fight spam and phishing attacks by enabling us to identify computers that are used to create large numbers of fake Micple accounts. We also use cookies to detect computers
    //         infected with malware and to take steps to prevent them from causing further harm.. Cookies also help us prevent underage people from registering for Micple accounts.
    //       </p>

    //       <h3 className='text-center mt-3'>Site features and services</h3>

    //       <p className='mt-2'>
    //         We use cookies to enable the functionality that helps us provide the Micple Products.
    //       </p>
    //       <p >
    //         For example: Cookies help us store preferences, know when you've seen or interacted with Micple Products' content and provide you with customised content and experiences.
    //         For instance, cookies allow us to make suggestions to you and others, and to customise content on third-party sites that integrate our social plugins. If you are a Micple
    //         Page administrator, cookies allow you to switch between posting from your personal Micple account and the Micple Page. We use cookies such as the session-based "presence" cookie
    //         to support your use of Messenger chat windows.
    //       </p>
    //       <p>
    //         We also use cookies to help provide you with content relevant to your locale.
    //       </p>
    //       <p>
    //         For example: We store information in a cookie that is placed on your browser or device so that you will see the site in your preferred language
    //       </p>

    //       <h3 className='text-center mt-3'>Third-party websites and apps</h3>
    //       <p className='mt-2'>
    //         Our business partners may also choose to share information with Micple from cookies set in their own websites' domains,
    //         whether or not you have a Micple account or are logged in. Unlike cookies that are set on Micple's own domains, these cookies aren't accessible by Micple when you're on a
    //         site other than the one on which they were set, including when you are on one of our domains. They serve the same purposes as cookies set in Micple's own domain,
    //         which are to personalise content (including ads), measure ads, produce analytics and provide a safer experience, as set out in this Cookies Policy.
    //       </p>

    //       <h3 className='text-center mt-3'>How can you control your information?</h3>
    //       <p className='mt-2'>
    //         We use cookies to help personalise and improve content and services, provide a safer experience and to show you useful and relevant ads on and off Micple Products.
    //         You can control how we use data to show you ads and more by using the tools described below.
    //       </p>

    //       <h3 className='text-center mt-3'>If you have a Micple account</h3>

    //       <p className='mt-2'>
    //         You can review your off-Micple activity, which is a summary of activity that businesses and organizations share with us about your interactions with them,
    //         such as visiting their apps or websites. They use our business tools, such as Micple Pixel, to share this information with us.
    //         This helps us do things such as give you a more personalised experience on Micple Products. Learn more about off-Micple activity, how we use it and how you can manage it.
    //       </p>

    //       <p className='mt-2'>
    //         You can use your ad preferences to learn why you're seeing a particular ad and control how we use information that we collect to show you ads.
    //       </p>

    //       <p className='mt-2'>
    //         To show you better ads, we use data that advertisers and other partners provide us about your activity off Micple Company Products, including websites and apps. You can control whether we use this data to show you ads in your ad settings.
    //       </p>
    //       <p className='mt-2'>
    //         The Micple Audience Network is a way for advertisers to show you ads in apps and websites off the Micple Company Products.
    //         One of the ways that Audience Network shows relevant ads is by using your ad preferences to determine which ads you may be interested in seeing. You can control this in your ad settings.
    //       </p>

    //       <h3 className='text-center mt-3'>Browser cookie controls</h3>

    //       <p className='mt-2'>
    //         In addition, your browser or device may offer settings that allow you to choose whether browser cookies are set and to delete them. These controls vary by browser,
    //         and manufacturers may change both the settings that they make available and how they work at any time.
    //         Certain parts of the Micple Products may not work properly if you have disabled browser cookie use. Please be aware that these controls are distinct from the controls that we offer you.
    //       </p>

    //       <p>Google Chrome</p>
    //       <p>Internet Explorer</p>
    //       <p>Firefox</p>
    //       <p>Safari</p>
    //       <p>Safari Mobile</p>
    //       <p>Opera</p>

    //       <h1 className='text-center mt-3'>Advertising Policy</h1>
    //       <h3 className='text-center mt-2'>Understanding our policies</h3>

    //       <p className='mt-2'>
    //         Our Advertising Policies provide guidance on what types of ad content are allowed. When advertisers place an order, each ad is reviewed against these policies.
    //         If you think that your ad was mistakenly disapproved, you can request a review of the decision in Account Quality.
    //       </p>

    //       <h3 className='text-center mt-2'>Common points of confusion</h3>
    //       <p className='mt-2'>
    //         To help you create a compliant and user-friendly advert experience, we've highlighted some common areas of confusion.
    //         Click the links below to learn more about each policy:
    //       </p>
    //       <p>Sexually suggestive content</p>
    //       <p>Personal attributes</p>
    //       <p>Micple's brands</p>

    //       <h3 className='text-center mt-3'>What to do if your ad is rejected?</h3>
    //       <h3 className='text-center '>Request another review</h3>
    //       <p className='mt-2'>
    //         If you believe that the ad was incorrectly rejected, you can request a review of the decision in Account Quality.
    //       </p>

    //       <h3 className='text-center mt-3'>Create a new ad or edit your ad</h3>
    //       <p className='mt-2'>
    //         You may create a new ad or revise your ad to comply with our Advertising Policies. These ads will be treated as new ads and reviewed by our ads review system.
    //       </p>


    //       <h3 className='text-center mt-3'>Restricted content</h3>
    //       <h3 className='text-center '>Promotion of online pharmacies</h3>
    //       <p className='mt-2'>
    //         Ads for online pharmacies are only permitted from advertisers with prior written permission. Micple requires online pharmacies who wish to run ads to be certified with LegitScript.
    //       </p>

    //       <h3 className='text-center mt-3'>Alcohol</h3>
    //       <p className='mt-2'>
    //         Ads that promote or reference alcohol must comply with all applicable local laws, required or established industry codes, guidelines, licences and approvals, and include age and country targeting criteria consistent with Micple's targeting requirements and applicable local laws. Note that our policies prohibit ads promoting or referencing alcohol in some countries, including,
    //         but not limited to, Afghanistan, Brunei, Bangladesh, Egypt, Gambia, Kuwait, Libya, Lithuania, Norway, Pakistan, Russia, Saudi Arabia, Thailand, Turkey, United Arab Emirates and Yemen.
    //       </p>

    //       <h3 className='text-center mt-3'>Dating</h3>

    //       <p className='mt-2'>
    //         Ads for dating services are only allowed with prior written permission. These must adhere to the dating targeting requirements and our dating ad guidelines. Details on the requirements for permission can be found here.
    //       </p>

    //       <h3 className='text-center mt-3'>Online gambling and gaming</h3>

    //       <p className='mt-2'>
    //         Ads that promote online gambling, and gaming where anything of monetary value (including cash or digital/virtual currencies, e.g. bitcoin) is
    //         required to play and anything of monetary value forms part of the prize, are only allowed with our prior written permission.
    //         This includes games where purchases are required to continue game play and/or provide advantage in winning prizes, in cases where the prize is of monetary value.
    //         Authorised advertisers must follow all applicable laws, including targeting their ads in accordance with legal requirements. At a minimum, ads may not be targeted to people under 18 years of age.
    //       </p>

    //       <h3 className='text-center mt-3'>Promotion of over-the-counter medicines</h3>

    //       <p className='mt-2'>
    //         Ads that promote over-the-counter medicines must comply with all applicable local laws, required or established industry codes, guidelines, licences and approvals, and include age and country targeting criteria consistent with applicable local laws.
    //       </p>

    //       <h3 className='text-center mt-3'>Subscription services</h3>

    //       <p className='mt-2'>
    //         Adverts for subscription services or that promote products or services that include negative options,
    //         automatic renewal, free-to-pay conversion billing products or mobile marketing are subject to our subscription services requirements.
    //       </p>

    //       <h3 className='text-center mt-3'>Cosmetic procedures and wellness</h3>

    //       <p className='mt-2'>Ads marketing weight loss products and services must be targeted to people aged 18 or older.</p>
    //       <p >Ads marketing cosmetic surgeries and procedures must be targeted to people aged 18 or older.</p>
    //       <p >Ads marketing dietary, health or herbal supplements must be targeted to people at least 18 years or older.</p>

    //       <h3 className='text-center mt-3'>Social casino games</h3>

    //       <p className='mt-2'> Ads for social casino games, which are online games that simulate casino gambling (e.g. poker, slots, roulette etc.) where there is no opportunity to win money or money's worth, are only allowed if they are targeted to people 18 years or older.</p>


    //       <h3 className='text-center mt-3'>Promotion of prescription drugs</h3>

    //       <p className='mt-2'>Ads may not promote prescription drugs without prior written permission.</p>
    //       <p>The following entities are eligible to apply for permission from Micple: online pharmacies, telehealth providers and pharmaceutical manufacturers.</p>

    //       <h3 className='text-center mt-3'>Financial and insurance products and services</h3>
    //       <p className='mt-2'>
    //         Ads promoting credit card applications or financial services with accredited institutions must clearly provide sufficient disclosure regarding associated fees,
    //         including APR percentages, transaction fees, interest rates and the physical address of the entity offering the product within the ad's landing page.
    //         Ads promoting credit cards, loans or insurance services must be targeted to people aged 18 or above.
    //         Ads promoting credit cards, loans or insurance services must not directly request the input of a person's financial information, including credit card information.
    //       </p>

    //       <h3 className='text-center mt-3'>Branded content</h3>

    //       <p className='mt-2'>
    //         Ads promoting branded content must tag the featured third-party product, brand or business partner using the branded content tool.
    //         Branded content within ads is defined as a creator or publisher's content that features or is influenced by a business partner for an exchange of value.
    //         When promoting branded content integrations, advertisers must use the branded content tool.
    //       </p>

    //       <h3 className='text-center mt-3'>Ads about social issues, elections or politics</h3>

    //       <p className='mt-2'>
    //         Advertisers can run ads about social issues, elections or politics, provided that the advertiser complies with all applicable laws and the authorisation process required by Micple.
    //         Where appropriate, Micple may restrict issue, electoral or political ads. In addition, certain content related to elections may be prohibited in specific regions ahead of voting.
    //       </p>

    //       <h3 className='text-center mt-3'>Disclaimers for ads about social issues, elections or politics</h3>

    //       <p className='mt-2'>
    //         If Micple's ad authorisation process is available in your country, in addition to complying with the Community Standards and Advertising Policies,
    //         the disclaimer you submit for your ad about social issues, elections or politics must comply with the following guidelines.
    //         This information is provided by you during the ad authorisation process and will be displayed on your ad's header.
    //       </p>

    //       <h3 className='text-center mt-3'>Cryptocurrency products and services</h3>
    //       <p className='mt-2'>
    //         Ads may not promote cryptocurrency trading platforms, software and related services and products that enable monetisation, reselling, swapping or staking of cryptocurrencies without prior written permission.
    //       </p>

    //       <h3 className='text-center mt-3'>Drug and alcohol addiction treatment</h3>

    //       <p className='mt-2'>
    //         Micple requires advertisers who wish to run addiction treatment ads targeting the US to be certified with LegitScript, and apply to Micple for permission to advertise.
    //       </p>

    //       <h3 className='text-center mt-3'>The advert review process</h3>
    //       <p className='mt-2'>
    //         The Micple ad review system relies primarily on automated tools to check ads against our Advertising Policies. This happens automatically before ads begin running, and is typically completed within 24 hours, although it may take longer in some cases. During this review,
    //         the status of the ad will be "In review". Additionally, ads may be reviewed again, including after they are live. You can find more information in our Business Help Centre.
    //       </p>

    //       <h3 className='text-center mt-3'>Outcome of review</h3>

    //       <p className='mt-2'>If a violation is found at any point in the review process, the ad will be rejected.</p>
    //       <p >Lower-quality ads which do not necessarily violate our policies may experience affected performance. </p>
    //       <p >You can find more information about how quality may affect your ad in our Help Centre.</p>

    //       <h3 className='text-center mt-3'>Re-review of ads</h3>

    //       <p className='mt-2'>
    //         Ads remain subject to review and re-review at all times, and may be rejected for violation of our policies at any time.
    //         It is your responsibility to understand and comply with the Micple Advertising Policies.
    //       </p>


    //       <h3 className='text-center mt-3'>What is reviewed</h3>

    //       <p className='mt-2'>
    //         The ad review system reviews ads for violations of our Advertising Policies. This review process may
    //         include the specific components of an ad, such as images, video, text and targeting information, as well as an ad's associated landing page or other destinations, among other information.
    //       </p>

    //       <h3 className='text-center mt-3'>Further enforcement</h3>

    //       <p className='mt-2'>
    //         Beyond enforcing our policies on individual ads, violations of our terms and policies may result in further enforcement actions, such as disabling ad accounts,
    //         Pages, Business Managers and/or individual user accounts. Disabled accounts, Pages or Business Managers cannot run ads,
    //         and advertisers may be ineligible to advertise. You can learn more about what to do if your ad account is disabled here or your advertising is restricted here.
    //       </p>

    //       <h3 className='text-center mt-3'>Targeting</h3>

    //       <p className='mt-2'>
    //         You must not use targeting options to discriminate against, harass, provoke or disparage users,
    //         or to engage in predatory advertising practices. If you target your adverts to Custom Audiences, you must comply with the applicable terms when creating an audience.
    //       </p>

    //       <h3 className='text-center mt-3'>Positioning</h3>
    //       <h3 className='text-center mt-3'>Accuracy</h3>

    //       <p className='mt-2'>
    //         Adverts must clearly represent the company, product, service or brand that is being advertised.
    //       </p>

    //       <h3 className='text-center mt-3'>Relevance</h3>

    //       <p className='mt-2'>
    //         All advert components, including any text, images or other media, must be relevant and appropriate to the product or service being offered and the audience viewing the advert.
    //       </p>

    //       <h3 className='text-center mt-3'>Related landing pages</h3>
    //       <p className='mt-2'>
    //         The products and services promoted in an ad's text must match those promoted on the landing page, and the destination site must not offer or link to any prohibited product or service.
    //       </p>


    //       <h3 className='text-center mt-3'>Lead adverts</h3>
    //       <p className='mt-2'>
    //         Advertisers must not create lead ads questions to request the following types of information without our prior written permission.
    //       </p>

    //       <h3 className='text-center mt-3'>Insurance information</h3>
    //       <p className='mt-2'>
    //         Adverts must not request insurance information, including current insurance policy numbers, without our prior permission.
    //       </p>

    //       <h3 className='text-center mt-3'>Political affiliation</h3>

    //       <p className='mt-2'>
    //         Ads must not request information regarding political affiliation.
    //       </p>

    //       <h3 className='text-center mt-3'>Prefill questions</h3>
    //       <p className='mt-2'>
    //         Ads must not request the same or substantially similar information that you could use a prefill question to request.
    //       </p>


    //       <h3 className='text-center mt-3'>Trade union membership</h3>
    //       <p className='mt-2'>
    //         Adverts must not request information regarding trade union membership status without our prior permission.
    //       </p>

    //       <h3 className='text-center mt-3'>Race or ethnicity</h3>

    //       <p className='mt-2'>
    //         Adverts must not request information regarding the race or ethnicity without our prior permission.
    //       </p>

    //       <h3 className='text-center mt-3'>Account numbers</h3>

    //       <p className='mt-2'>
    //         Adverts must not request account numbers, including frequent flyer numbers, loyalty card numbers or cable or telephone account numbers, without our prior permission.
    //       </p>

    //       <h3 className='text-center mt-3'>Government-issued identifiers</h3>

    //       <p className='mt-2'>
    //         Ads must not request government-issued identifiers, including National Insurance numbers, passport numbers or driving licence numbers, without our prior permission.
    //       </p>

    //       <h3 className='text-center mt-3'>Health information</h3>

    //       <p className='mt-2'>
    //         Adverts must not request health information, including information on physical health, mental health, medical treatments, medical conditions or disabilities, without our prior permission.
    //       </p>

    //       <h3 className='text-center mt-3'>Religion</h3>

    //       <p className='mt-2'>
    //         Adverts must not request information regarding religion or philosophical beliefs without our prior permission.
    //       </p>

    //       <h3 className='text-center mt-3'>Sexual orientation</h3>

    //       <p className='mt-2'>
    //         Adverts must not request information regarding sexual orientation or information about the sexual life of the individual, including what gender(s) the person prefers to date, without our prior permission.
    //       </p>

    //       <h3 className='text-center mt-3'>Usernames or passwords</h3>

    //       <p className='mt-2'>
    //         Adverts must not request usernames or passwords, including usernames and passwords for existing and new accounts, without our prior permission. If you want to direct people to sign up for an account with your site or service, you should use the Clicks to Website or Website Conversions objective when you run your adverts.
    //       </p>

    //       <h3 className='text-center mt-3'>Criminal history</h3>

    //       <p className='mt-2'>
    //         Adverts must not request information regarding criminal or arrest history without our prior permission.
    //       </p>

    //       <h3 className='text-center mt-3'>Financial information</h3>

    //       <p className='mt-2'>
    //         Adverts must not request financial information, including bank account numbers, bank routing numbers, credit or debit card numbers, credit scores, income, net worth or how much debt someone has, without our prior permission.
    //       </p>

    //       <h3 className='text-center mt-3'>Prohibited content</h3>
    //       <h3 className='text-center mt-3'>Personal attributes</h3>

    //       <p className='mt-2'>
    //         Ads must not contain content that asserts or implies personal attributes. This includes direct or indirect assertions or implications about a person's race, ethnicity, religion, beliefs, age, sexual orientation or practices, gender identity, disability, physical or mental health (including medical condition), vulnerable financial status, voting status, membership in a trade union, criminal record or name.
    //       </p>

    //       <h3 className='text-center mt-3'>Misinformation</h3>

    //       <p className='mt-2'>
    //         Micple prohibits ads that include claims debunked by third-party fact-checkers or, in certain circumstances, claims debunked by organisations with particular expertise.
    //         Advertisers that repeatedly post information deemed to be false may have restrictions placed on their ability to advertise on Micple.
    //       </p>

    //       <h3 className='text-center mt-3'>Sale of body parts</h3>

    //       <p className='mt-2'>
    //         Ads must not promote the sale of human body parts or fluids.
    //       </p>

    //       <h3 className='text-center mt-3'>Vaccine discouragement</h3>

    //       <p className='mt-2'>
    //         Ads must not discourage people from vaccination or advocate against vaccines.
    //       </p>

    //       <h3 className='text-center mt-3'>Inflammatory content</h3>

    //       <p className='mt-2'>
    //         Ads must not contain claims that a person or group of people are a threat to the physical safety, health or survival of others on the basis of race, ethnicity, national origin, religious affiliation, sexual orientation, caste, sex, gender, gender identity, serious disease, disability or immigration status.
    //       </p>

    //       <p className='mt-2'>
    //         Ads must not promote violent or dehumanising speech, statements of inferiority or contempt or disgust based on protected characteristics or immigration status as outlined in our Community Standards.
    //       </p>

    //       <h3 className='text-center mt-3'>Community Standards</h3>

    //       <p className='mt-2'>
    //         Adverts must not violate our Community Standards. Adverts on Micple must not violate the Micple Community Guidelines
    //       </p>

    //       <h3 className='text-center mt-3'>Tobacco and related products</h3>

    //       <p className='mt-2'>
    //         Ads must not promote the sale or use of tobacco products and related paraphernalia. Advertisements must not promote electronic cigarettes, vaporisers or any other products that simulate smoking.
    //       </p>

    //       <h3 className='text-center mt-3'>Adult content</h3>

    //       <p className='mt-2'>
    //         Ads must not contain adult content. This includes nudity, depictions of people in explicit or suggestive positions, or activities that are overly suggestive or sexually provocative
    //       </p>
    //       <p>
    //         Ads that assert or imply the ability to meet someone, connect with them or view content created by them must not be positioned in a sexual way or with an intent to sexualise the person featured in the ad.
    //       </p>


    //       <h3 className='text-center mt-3'>Third-party infringement</h3>

    //       <p className='mt-2'>
    //         Ads must not contain content that infringes upon or violates the rights of any third party, including copyright, trademark, privacy, publicity or other personal or proprietary rights. To report content that you feel may infringe upon or violate your rights, please visit our Intellectual Property.
    //       </p>

    //       <h3 className='text-center mt-3'>Sensational content</h3>
    //       <p className='mt-2'>
    //         Ads must not contain shocking, sensational or excessively violent content.
    //       </p>

    //       <h3 className='text-center mt-3'>Controversial content</h3>

    //       <p className='mt-2'>
    //         Ads must not contain content that exploits crises or controversial political or social issues for commercial purposes.
    //       </p>

    //       <h3 className='text-center mt-3'>Non-functional landing page</h3>

    //       <p className='mt-2'>
    //         Adverts must not direct people to non-functional landing pages. This includes landing page content that interferes with a person's ability to navigate away from the page.
    //       </p>

    //       <h3 className='text-center mt-3'>Unsafe substances</h3>

    //       <p className='mt-2'>
    //         Ads must not promote the sale or use of illicit or recreational drugs, or other unsafe substances, products or supplements, as determined by Micple in its sole discretion.
    //       </p>

    //       <h3 className='text-center mt-3'>Weapons, ammunition or explosives</h3>
    //       <p className='mt-2'>
    //         Ads must not promote the sale or use of weapons, ammunition or explosives. This includes ads for weapon modification accessories.
    //       </p>

    //       <h3 className='text-center mt-3'>Adult products or services</h3>

    //       <p className='mt-2'>
    //         Ads must not promote the sale or use of adult products or services. Ads promoting sexual and reproductive health products or services,
    //         such as contraception and family planning, must be targeted to people aged 18 and older, and must not focus on sexual pleasure.
    //       </p>

    //       <h3 className='text-center mt-3'>Cheating and deceitful practices</h3>

    //       <p className='mt-2'>
    //         Ads may not promote products or services that are designed to enable a user to engage in cheating or deceitful practices.
    //       </p>

    //       <h3 className='text-center mt-3'>Grammar and profanity</h3>

    //       <p className='mt-2'>
    //         Ads must not contain profanity or bad grammar and punctuation.
    //         Symbols, numbers and letters must be used properly, without the intention of circumventing our ad review process or other enforcement systems.
    //       </p>

    //       <h3 className='text-center mt-3'>Non-existent functionality</h3>

    //       <p className='mt-2'>
    //         Ads must not contain images that portray non-existent functionality. This includes imagery that replicates play buttons, notifications or checkboxes, as well as ads containing features that do not work, such as multiple-choice options in the ad creative itself.
    //       </p>

    //       <h3 className='text-center mt-3'>Personal health</h3>

    //       <p className='mt-2'>
    //         Ad content must not imply or attempt to generate negative self-perception in order to promote diet, weight loss or other health-related products
    //       </p>

    //       <h3 className='text-center mt-3'>Payday loans, payslip advances and bail bonds</h3>

    //       <p className='mt-2'>
    //         Ads may not promote payday loans, payslip advances, bail bonds or any short-term loans intended to cover someone's expenses until their next payday. Short-term loan refers to a loan of 90 days or less.
    //       </p>

    //       <h3 className='text-center mt-3'>Multi-level marketing</h3>

    //       <p className='mt-2'>
    //         Adverts promoting income opportunities must fully describe the associated product or business model, and must not promote business models offering quick compensation for little investment, including multi-level marketing opportunities.
    //       </p>

    //       <h3 className='text-center mt-3'>Penny auctions</h3>

    //       <p className='mt-2'>
    //         Ads may not promote penny auctions, bidding fee auctions or other similar business models.
    //       </p>

    //       <h3 className='text-center mt-3'>Misleading claims</h3>

    //       <p className='mt-2'>
    //         Ads must not contain deceptive, false or misleading claims, such as those relating to the effectiveness or characteristics of a product or service,
    //         including misleading health, employment or weight-loss claims that set unrealistic expectations for users.
    //       </p>

    //       <h3 className='text-center mt-3'>Low-quality or disruptive content</h3>

    //       <p className='mt-2'>
    //         Ads must not contain content leading to external landing pages that provide an unexpected or disruptive experience. This includes misleading ad positioning, such as overly sensationalized headlines or prompts for users to
    //         inauthentically interact with the ad, and leading people to landing pages that contain minimal original content and a majority of unrelated or low-quality ad content.
    //       </p>

    //       <h3 className='text-center mt-3'>Spyware or malware</h3>

    //       <p className='mt-2'>
    //         Adverts must not contain spyware, malware or any software that results in an unexpected or deceptive experience. This includes links to sites containing these products.
    //       </p>

    //       <h3 className='text-center mt-3'>Unacceptable business practices</h3>

    //       <p className='mt-2'>
    //         Ads must not promote products, services, schemes or offers using deceptive or misleading practices, including those meant to scam people out of money or personal information.
    //       </p>

    //       <h3 className='text-center mt-3'>Circumventing systems</h3>

    //       <p className='mt-2'>
    //         Ads must not use tactics that are intended to circumvent our ad review process or other enforcement systems. This includes techniques that attempt to disguise the ad's content or destination page.
    //       </p>

    //       <h3 className='text-center mt-3'>Prohibited financial products and services</h3>

    //       <p className='mt-2'>
    //         Ads must not promote financial products and services that are frequently associated with misleading or deceptive promotional practices.
    //       </p>
    //       <p className='mt-2'>
    //         Militarised social movements and violence-inducing conspiracy networks
    //       </p>
    //       <p className='mt-2'>
    //         Ads must not contain praise, support or representation of individuals or groups with ties to violence.
    //       </p>

    //       <h3 className='text-center mt-3'>Illegal products or services</h3>

    //       <p className='mt-2'>
    //         Adverts must not constitute, facilitate or promote illegal products, services or activities. Adverts targeted to minors must not promote products,
    //         services or content that are inappropriate, illegal or unsafe, or that exploit, mislead or exert undue pressure on the age groups targeted.
    //       </p>

    //       <h3 className='text-center mt-3'>Discriminatory practices</h3>

    //       <p className='mt-2'>
    //         Ads must not discriminate or encourage discrimination against people based on personal attributes such as race, ethnicity, colour, national origin, religion, age, sex, sexual orientation, gender identity, family status, disability, medical or genetic condition.
    //       </p>


    //       <h3 className='text-center mt-3'>Video ads</h3>

    //       <p className='mt-2'>
    //         Video ads and other dynamic ad types must comply with all of the rules listed in these Advertising Policies, including the Community Standards, as well as the policies below:
    //       </p>

    //       <h3 className='text-center mt-3'>Entertainment-related restrictions</h3>

    //       <p className='mt-2'>
    //         Adverts for film trailers, TV programmes, video game trailers and other similar content intended for mature audiences are only allowed with prior written permission from Micple and must target people who are aged 18 years or older. Excessive depictions of the following content within these adverts are not allowed:
    //       </p>

    //       <p > Adult content</p>
    //       <p >Profanity</p>
    //       <p >Drug and alcohol use</p>
    //       <p >Violence and gore</p>

    //       <h3 className='text-center mt-3'>Disruptive content</h3>

    //       <p className='mt-2'> Videos and other similar advert types must not use overly disruptive tactics, such as flashing screens.</p>

    //       <h3 className='text-center mt-3'>Use of our brand assets</h3>

    //       <p className='mt-2'>
    //         For ads that feature the Micple or Micple brands please refer to the Micple Brand Resource Centre and the Micple Brand Resource Centre to review brand guidelines and download approved assets.
    //       </p>

    //       <h3 className='text-center mt-3'>Brand usage in ads</h3>
    //       <p className='mt-2'>
    //         Ads linking to Micple or Micple-branded content (including Pages, groups, events or sites that use Micple Login) may make limited reference to "Micple" or
    //         "Micple social media " in ad text for the purpose of clarifying the destination of the ad. Ads should not represent the Micple brand in a way that makes it
    //         the most distinctive or prominent feature of the creative.
    //         Micple brand assets should not be modified in any way, such as by changing the design or colour, or for the purpose of special effects or animation.
    //       </p>

    //       <h3 className='text-center mt-3'>Brand endorsement</h3>
    //       <p className='mt-2'>
    //         Adverts must not imply a Micple or Micple endorsement or partnership of any kind, or an endorsement by any other Micple company
    //       </p>

    //       <h3 className='text-center mt-3'>User interface screenshots</h3>
    //       <p className='mt-2'>
    //         When featuring the Micple, Messenger or Micple User Interface (UI) in an ad, it must accurately depict how the UI currently appears and functions in product.
    //         If an action or functionality depicted cannot happen in the current product or within the current UI, it cannot appear to happen in an ad. Depictions of the UI in
    //         ads must be featured within the context of a relevant device (e.g. mobile or desktop) and as permitted by the Micple Brand Guidelines or Micple Brand Guidelines.
    //         The UI cannot be modified in any way, including, but not limited to: adding special effects, interference or animation. Glyphs or elements of the UI cannot be used
    //         separately or individually.

    //       </p>
    //       <p className='mt-2'>
    //         Copyrights and trademarks: All other ads and landing pages must not use our copyrights, trademarks or any confusingly similar marks,
    //         except as expressly permitted by the Micple Brand Resource Centre and the Micple Brand Resource Centre, or with our prior written permission.
    //       </p>

    //       <h3 className='text-center mt-3'>Data use restrictions</h3>

    //       <p className='mt-2'>
    //         Don't use Micple advertising data, including the targeting criteria for your advert, to build, append to, edit, influence or augment user profiles, including profiles associated with any mobile device identifier or other unique identifiers that identify any particular user, browser, computer or device.
    //       </p>
    //       <p >
    //         Ensure that any advert data collected, received or derived from your Micple or Micple social media advert ("Micple advertising data") is
    //         only shared with someone acting on your behalf, such as your service provider. You are responsible for ensuring that your service providers
    //         protect any Micple advertising data or any other information obtained from us, limit their use of all of this information, and keep it confidential and secure.
    //       </p>
    //       <p>
    //         Don't transfer any Micple advertising data (including anonymous, aggregate or derived data) to any advertising network, advert exchange, data broker or other advertising or monetisation-related service. Don't use Micple advertising data for any purpose (including retargeting, commingling data across multiple advertisers' campaigns or allowing piggybacking or redirecting with tags),
    //         except on an aggregate and anonymous basis (unless authorised by Micple) and only to assess the performance and effectiveness of your Micple advertising campaigns.
    //       </p>

    //       <h3 className='text-center mt-3'>Things you should know</h3>

    //       <p className='mt-2'>
    //         As stated in our Community Standards, you must not sell, rent, buy or exchange site privileges, such as administrative access,
    //         for assets that belong to you or that you manage. Helping anyone evade or circumvent our enforcement of our policies or Terms of Service is also prohibited.
    //         We reserve the right to reject, approve or remove any ad for any reason, in our sole discretion, including ads that negatively affect our
    //         relationship with our users or that promote content, services or activities, contrary to our competitive position, interests or advertising philosophy.
    //       </p>

    //       <h3 className='text-center mt-3'>The Advertising Policies apply to</h3>
    //       <p className='mt-2'>
    //         adverts and commercial content served by or purchased through Micple, on or off the Micple services, including adverts purchased under
    //         AAAA/IAB Standard Terms and Conditions,  adverts appearing within apps on Micple, and  adverts on Micple. Your use of Micple's advertising products and services is part
    //         of "Micple" under Micple's Statement of Rights and Responsibilities (<a href='https://www.Micple.com/legal/terms'>https://www.Micple.com/legal/terms</a>, the "SRR") and is subject to the SRR.You may be subject to additional
    //         terms or guidelines if you use Micple or certain Micple advertising-related products or services. Once displayed, ads are public information. Ads may be reshared and accessed
    //         outside the targeted audience, including from the Micple Page running the ads or within Micple Products. If users have interacted with your ad, your ad may remain on Micple products
    //         (for example, shared until the users delete it or visible to users through their account tools). If your ad is a political ad, it will be displayed in our Ad Archive. This means that
    //         Micple may display (at no cost to you) and provide access to the ad content and creative, as well as information about the ad campaign (such as total spend and delivery data) for a period
    //         of seven (7) years from the completion of your order. Micple may disclose your advertising content, and all information associated with your advertising, to a governmental entity or body
    //         if Micple believes that disclosure would assist in a lawful investigation. If you are managing ads on behalf of other advertisers, each advertiser or client must be managed through separate
    //         ad accounts. You must not change the advertiser or client associated with an established ad account; set up a new account. You are responsible for ensuring that each advertiser complies
    //         with these Advertising Policies. For policies that require prior written permission, Micple or a Micple company may grant these permissions. Advertisers are responsible for understanding
    //         and complying with all applicable laws and regulations. Failure to comply may result in a variety of consequences, including the cancellation of adverts you have placed and termination of
    //         your account. We do not use sensitive personal data for advert targeting.
    //         Topics you choose for targeting your advert don't reflect the personal beliefs, characteristics or values of the people who use Micple social media or Micple search engine.
    //       </p>

    //       <p className='mt-3'>
    //         These policies are subject to change at any time without notice.
    //       </p>



    //       <h3 className='mt-3'>How to contact us with questions</h3>

    //       <p className='mt-2'>
    //         You can learn more about how privacy works on Micple and on Micple Social media or search engine or the other products and services. If you have questions about this policy, you can contact us as described below.
    //       </p>

    //       <p className='mt-2 '> <strong  >Contact us</strong></p>
    //       <p>You can contact us online or by writing to:</p>
    //       <strong>MICPLE Company Ltd.</strong>
    //       <p>Address: House: 161/A, Madhyapara, P.O. Khilkhet-1229, , Dhaka</p>
    //       <p>phone number:+8801407069050</p>
    //       <span>Email: <a href="contact@micple.com">contact@micple.com</a> </span>

    //     </div>

    //   </div>
    // </div>
  )
}

export default Privacy