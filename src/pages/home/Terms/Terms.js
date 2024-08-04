import React, { useEffect, useState } from 'react'
import { useLocation } from "react-router";

import "./style.scss";

import axios from "axios";
import { BACKEND_URL } from '../../../shared/constants/Variables';



const Terms = () => {

  const [terms, setTerms] = useState({});

  const location = useLocation();


  useEffect(() => {

    axios
      .get(`${BACKEND_URL}/admin-notes-public${location.pathname}`)
      .then(({ data }) => {
        setTerms(data.content)
      })
      .catch((err) => {
        console.log("something went wrong.")
      })


  }, [])

  return (


    <div className='terms-and-condition-section '>

      <div className='terms-and-condition-container '>

        {
           Object.keys(terms).length !== 0 ?
            <div className='terms-and-condition'>
              <div
                className="ql-editor"
                dangerouslySetInnerHTML={{ __html: terms }}
              />
            </div>
            : ""
        }


      </div>
    </div>

    // <div className='terms-and-condition-section '>

    //   <div className='terms-and-condition-container '>
    //     <div>

    //       <h1>Terms of Service Social Media</h1>
    //       <h2 className='mt-2'>Social Media</h2>

    //       <p className='text-margin'>
    //         Micple builds technologies and services that enable people to connect with each other, build communities and grow businesses. These Terms govern your use of Micple social media and search engine service and the other products, features, apps, services, technologies and software that we offer except where we expressly state that separate terms (and not these) apply. These Products are provided to you by Micple Company Limited Platforms.
    //       </p>


    //       <p className='text-margin'>
    //         We don't sell your personal data to advertisers, and we don't share information that directly identifies you (such as your name, email address or other contact information) with advertisers unless you give us specific permission. Instead, advertisers can tell us things such as the kind of audience that they want to see their ads, and we show those ads to people who may be interested. We provide advertisers with reports about the performance of their ads that help them understand how people are interacting with their content.
    //       </p>

    //       <p className='text-margin'>
    //         We don't charge you to use Micple social media or search engine or the other products and services covered by these Terms. Instead, businesses and organisations pay us to show you ads for their products and services. By using our Products, you agree that we can show you ads that we think will be relevant to you and your interests. We use your personal data to help determine which ads to show you.
    //       </p>

    //       <p className='text-margin'>
    //         Our Data Policy explains how we collect and use your personal data to determine some of the ads that you see and provide all of the other services described below. You can also go to your settings at any time to review the privacy choices that you have about how we use your data.
    //       </p>



    //       <h3 className='mt-3'>1. The services we provide</h3>

    //       <p className='mt-1'>
    //         Our mission is to give people the power to build community and bring the world closer together. To help advance this mission, we provide the products and services described below to you:<br />
    //         Provide a personalised experience for you:
    //       </p>

    //       <p className='mt-2'>
    //         We use the data that we have – for example, about the connections you make, the choices and settings you select, and what you share and do on and off our Products – to personalise your experience.
    //       </p>

    //       <p className='mt-2'>
    //         Your experience on Micple social media or search engine is unlike anyone else's: from the posts, stories, events, ads and other content that you see in News Feed or our video platform to the Micple social media that you follow and other features you might use, such as Trending, Micple Marketplace and search.
    //       </p>


    //       <h5 className='text-margin'>Connect you with people and organisations that you care about: </h5>
    //       <p >
    //         We help you find and connect with people, groups, businesses, organisations and others that matter to you across the Micple Products you use.
    //       </p>

    //       <p className='text-margin'>
    //         We use the data we have to make suggestions for you and others – for example, groups to join, events to attend, Micple social media to follow or send a message to, shows to watch and people you may want to become friends with. Stronger ties make for better communities, and we believe that our services are most useful when people are connected to people, groups and organisations that they care about.
    //       </p>

    //       <h5 className='text-margin'>Help you discover content, products and services that may interest you:</h5>
    //       <p>
    //         We show you ads, offers and other sponsored content to help you discover content, products and services that are offered by the many businesses and organisations that use Micple and other Micple Products.
    //       </p>

    //       <h5 className='text-margin'>Empower you to express yourself and communicate about what matters to you:</h5>
    //       <p>
    //         There are many ways to express yourself on Micple and to communicate with friends, family and others about what matters to you – for example, sharing status updates, photos, videos and stories across the Micple Products that you use, sending messages to a friend or several people, creating events or groups, or adding content to your profile. We have also developed, and continue to explore, new ways for people to use technology, such as augmented reality and 360 video to create and share more expressive and engaging content on Micple Products.
    //       </p>

    //       <h5 className='text-margin'>Use and develop advanced technologies to provide safe and functional services for everyone:</h5>
    //       <p>
    //         We use and develop advanced technologies such as artificial intelligence, machine learning systems and augmented reality so that people can use our Products safely regardless of physical ability or geographic location. For example, technology such as this helps people who have visual impairments understand what or who is in photos or videos shared on Micple social media or search engine service. We also build sophisticated network and communication technology to help more people connect to the Internet in areas with limited access. And we develop automated systems to improve our ability to detect and remove abusive and dangerous activity that may harm our community and the integrity of our Products.
    //       </p>

    //       <h5 className='text-margin'>Provide consistent and seamless experiences across the Micple Company Products:</h5>
    //       <p>
    //         Our Products help you find and connect with people, groups, businesses, organisations and others that are important to you. We design our systems so that your experience is consistent and seamless across the different Micple Company Products that you use. For example, we use data about the people you engage with on Micple to make it easier for you to connect with them on Micple social media or search engine service, and we enable you to communicate with businesses that you follow on Micple through Micple social media.
    //       </p>

    //       <h5 className='text-margin'>Combat harmful conduct, and protect and support our community:</h5>
    //       <p>
    //         People will only build community on Micple Products if they feel safe. We employ dedicated teams around the world and develop advanced technical systems to detect misuse of our Products, harmful conduct towards others and situations where we may be able to help support or protect our community. If we learn of content or conduct such as this, we will take appropriate action – for example, offering help, removing content, removing or restricting access to certain features, disabling an account or contacting law enforcement. We share data with other Micple Companies when we detect misuse or harmful conduct by someone using one of our Products.
    //       </p>

    //       <h5 className='text-margin'>Enable global access to our services:</h5>
    //       <p>
    //         To operate our global service, we need to store and distribute content and data in our data centres and systems around the world, including outside your country of residence. This infrastructure may be operated or controlled by Micple Platforms, Micple Company Limited or its affiliates.
    //       </p>

    //       <h5 className='text-margin'>Research ways to make our services better:</h5>
    //       <p>
    //         We engage in research to develop, test and improve our Products. This includes analysing the data we have about our users and understanding how people use our Products, for example by conducting surveys and testing and troubleshooting new features. Our Data Policy explains how we use data to support this research for the purposes of developing and improving our services.
    //       </p>

    //       <h5 className='text-margin'>Use and develop advanced technologies to provide safe and functional services for everyone:</h5>
    //       <p>
    //         We use and develop advanced technologies such as artificial intelligence, machine learning systems and augmented reality so that people can use our Products safely regardless of physical ability or geographic location. For example, technology such as this helps people who have visual impairments understand what or who is in photos or videos shared on Micple social media or search engine service. We also build sophisticated network and communication technology to help more people connect to the Internet in areas with limited access. And we develop automated systems to improve our ability to detect and remove abusive and dangerous activity that may harm our community and the integrity of our Products.
    //       </p>



    //       <h3 className='mt-3'>2. What you can share and do on Micple Products</h3>

    //       <p>
    //         We can remove or restrict access to content that is in violation of these provisions.
    //         If we remove content that you have shared in violation of our Community Standards, we'll let you know and explain any options you have to request another review, unless you seriously or repeatedly violate these Terms or if doing so may expose us or others to legal liability; harm our community of users; compromise or interfere with the integrity or operation of any of our services, systems or Products; where we are restricted due to technical limitations; or where we are prohibited from doing so for legal reasons.
    //       </p>

    //       <p className='text-margin'>
    //         We want people to use Micple Products to express themselves and to share content that is important to them, but not at the expense of the safety and well-being of others or the integrity of our community. You therefore agree not to engage in the conduct described below (or to facilitate or support others in doing so):
    //       </p>

    //       <ul className='ul-design'>

    //         <li>You may not use our Products to do or share anything:
    //           <ul className='ul-design'>
    //             <li>That violates these Terms, our Community Standards and other terms and policies that apply to your use of our Products.</li>
    //             <li>That is unlawful, misleading, discriminatory or fraudulent.</li>
    //             <li>That infringes or violates someone else's rights, including their intellectual property rights.</li>
    //           </ul>
    //         </li>
    //         <li>
    //           You may not upload viruses or malicious code, or do anything that could disable, overburden or impair the proper working or appearance of our Products.
    //         </li>
    //         <li>You may not access or collect data from our Products using automated means (without our prior permission) or attempt to access data that you do not have permission to access.</li>
    //         <li>To help support our community, we encourage you to report content or conduct that you believe violates your rights (including intellectual property rights) or our terms and policies.</li>
    //         <li>We also can remove or restrict access to your content, services or information if we determine that doing so is reasonably necessary to avoid or mitigate adverse legal or regulatory impacts to Micple.</li>
    //       </ul>



    //       <h3 className='mt-3'>3. Your commitments to Micple and our community:</h3>


    //       <p>We provide these services to you and others to help advance our mission. In exchange,<br /> we need you to make the following commitments:</p>

    //       <h5 className='sub-headline'>1. Who can use Micple</h5>
    //       <p>
    //         When people stand behind their opinions and actions, our community is safer and more accountable. For this reason, you must:
    //       </p>

    //       <ul className='sub-headline-ul-design'>
    //         <li>use the same name that you use in everyday life;</li>
    //         <li>provide accurate information about yourself;</li>
    //         <li>create only one account (your own) and use your timeline for personal purposes; and</li>
    //         <li>not share your password, give access to your Micple account to others or transfer your account to anyone else (without our permission).</li>
    //       </ul>

    //       <p>We try to make Micple broadly available to everyone, but you cannot use Micple if:</p>
    //       <ul className='sub-headline-ul-design'>
    //         <li>You are under 13 years old (or the minimum legal age in your country to use our Products).</li>
    //         <li>You are a convicted sex offender.</li>
    //         <li>We've previously disabled your account for violations of our Terms or Policies.</li>
    //         <li>You are prohibited from receiving our products, services or software under applicable laws.</li>
    //       </ul>

    //       <h5 className='sub-headline'>2. How our services are funded</h5>
    //       <ul className='sub-headline-ul-design'>
    //         <li>
    //           Instead of paying to use Micple and the other products and services we offer, by using the Micple Products covered by these Terms, you agree that we can show you ads that businesses and organisations pay us to promote on and off the Micple Company Products. We use your personal data, such as information about your activity and interests, to show you ads that are more relevant to you.
    //         </li>
    //         <li>
    //           Protecting people's privacy is central to how we've designed our ad system. This means that we can show you relevant and useful ads without telling advertisers who you are. We don't sell your personal data. We allow advertisers to tell us things such as their business goal, and the kind of audience that they want to see their ads (for example, people between the ages of 18-35 who like cycling). We then show their ad to people who might be interested.
    //         </li>
    //         <li>
    //           We also provide advertisers with reports about the performance of their ads to help them understand how people are interacting with their content on and off Micple. For example, we provide general demographic and interest information to advertisers (for example, that an ad was seen by a woman between the ages of 25 and 34 who lives in Madrid and likes software engineering) to help them better understand their audience
    //         </li>
    //         <li>
    //           We don't share information that directly identifies you (information such as your name or email address that by itself can be used to contact you or identifies who you are) unless you give us specific permission. Learn more about how Micple ads work.
    //         </li>
    //         <li>
    //           We collect and use your personal data in order to provide the services described above for you. You can learn about how we collect and use your data in our Data Policy. You have controls over the types of ads and advertisers you see, and the types of information we use to determine which ads we show you.
    //         </li>
    //       </ul>

    //       <h5 className='sub-headline'>3. The permissions you give us</h5>
    //       <p>We need certain permissions from you to provide our services:</p>

    //       <ul className='sub-headline-ul-design'>
    //         <li>
    //           <strong>Permission to use content that you create and share: </strong>Some content that you share or upload, such as photos or videos, may be protected by intellectual property laws.
    //           <p className='text-margin'>
    //             However, to provide our services, we need you to give us some legal permissions (known as a ‘licence') to use this content. This is solely for the purposes of providing and improving our Products and services as described above.
    //           </p>
    //           <p className='text-margin'>
    //             Specifically, when you share, post or upload content that is covered by intellectual property rights on or in connection with our Products, you grant us a non-exclusive, transferable, sub-licensable, royalty-free and worldwide licence to host, use, distribute, modify, run, copy, publicly perform or display, translate and create derivative works of your content (consistent with your privacy and application settings). This means, for example, that if you share a photo on Micple, you give us permission to store, copy and share it with others (again, consistent with your settings) such as service providers that support our service or other Micple Products you use. This licence will end when your content is deleted from our systems.
    //           </p>
    //           <p className='text-margin'>
    //             You can delete content individually or all at once by deleting your account. Learn more about how to delete your account. You can download a copy of your data at any time before deleting your account.
    //           </p>
    //           <p className='text-margin'>
    //             When you delete content, it's no longer visible to other users; however, it may continue to exist elsewhere on our systems where:
    //           </p>

    //           <ul className='sub-headline-ul-design'>
    //             <li>
    //               Immediate deletion is not possible due to technical limitations (in which case, your content will be deleted within a maximum of 90 days from when you delete it);
    //             </li>
    //             <li>
    //               your content has been used by others in accordance with this licence and they have not deleted it (in which case, this licence will continue to apply until that content is deleted); or
    //             </li>
    //           </ul>
    //         </li>

    //         <li>
    //           <strong>Where immediate deletion would restrict our ability to:</strong>
    //           <ul className='sub-headline-ul-design'>
    //             <li>investigate or identify illegal activity or breaches of our Terms and Policies (for example, to identify or investigate misuse of our Products or systems);</li>
    //             <li>comply with a legal obligation, such as the preservation of evidence; or</li>
    //             <li>
    //               comply with a request of a judicial or administrative authority, law enforcement or a government agency; in which case, the content will be retained for no longer than is necessary for the purposes for which it has been retained (the exact duration will vary on a case-by-case basis).
    //             </li>
    //             <p className='text-margin'>
    //               In each of the above cases, this licence will continue until the content has been fully deleted.
    //             </p>
    //           </ul>
    //         </li>



    //         <li>
    //           <strong>Permission to use your name, profile picture and information about your actions with ads and sponsored content:</strong> You give us permission to use your name and profile picture and information about actions that you have taken on Micple next to or in connection with ads, offers and other sponsored content that we display across our Products, without any compensation to you. For example, we may show your friends that you are interested in an advertised event or have liked a Micple Page created by a brand that has paid us to display its ads on Micple. Ads like this can be seen only by people who have your permission to see the actions that you've taken on Micple Products. You can learn more about your ad settings and preferences.

    //         </li>
    //         <li>
    //           <strong>Permission to update software that you use or download: </strong> If you download or use our software, you give us permission to download and install updates to the software where available.
    //         </li>
    //       </ul>

    //       <h5 className='sub-headline'>4. Limits on using our intellectual property</h5>
    //       <p>
    //         If you use content covered by intellectual property rights that we have and make available in our Products (for example, images, designs, videos or sounds that we provide, which you add to content that you create or share on Micple), we retain all rights to that content (but not yours). You can only use our copyrights or trademarks (or any similar marks) as expressly permitted by our Brand Usage Guidelines or with our prior written permission. You must obtain our written permission (or permission under an open-source licence) to modify, create derivative works of, decompile or otherwise attempt to extract source code from us.
    //       </p>



    //       <h3 className='mt-3'>4. Additional provisions</h3>


    //       <h5 className='sub-headline'>1. Updating our Terms</h5>
    //       <p>
    //         We work constantly to improve our services and develop new features to make our Products better for you and our community. As a result, we may need to update these Terms from time to time to accurately reflect our services and practices. We will only make changes if the provisions are no longer appropriate or if they are incomplete, and only if the changes are reasonable and take due account of your interests.
    //         We will notify you (for example, by email or through our Products) at least 30 days before we make changes to these Terms and give you an opportunity to review them before they go into effect, unless changes are required by law. Once any updated Terms are in effect, you will be bound by them if you continue to use our Products.
    //         We hope that you will continue using our Products, but if you do not agree to our updated Terms and no longer want to be a part of the Micple community, you can delete your account at any time.
    //       </p>

    //       <h5 className='sub-headline'>2. Account suspension or termination</h5>
    //       <p>We want Micple to be a place where people feel welcome and safe to express themselves and share their thoughts and ideas.</p>
    //       <p>If we determine that you have clearly, seriously or repeatedly breached our Terms or Policies, including in particular our Community Standards, we may suspend or permanently disable access to your account. We may also suspend or disable your account if you repeatedly infringe other people's intellectual property rights or where we are required to do so for legal reasons.</p>

    //       <p className='text-margin'>
    //         Where we take such action, we'll let you know and explain any options you have to request a review, unless doing so may expose us or others to legal liability; harm our community of users; compromise or interfere with the integrity or operation of any of our services, systems or Products; or where we are restricted due to technical limitations; or where we are prohibited from doing so for legal reasons.
    //       </p>
    //       <p>
    //         You can learn more about what you can do if your account has been disabled and how to contact us if you think that we have disabled your account by mistake.
    //       </p>
    //       <p>
    //         If you delete or we disable your account, these Terms shall terminate as an agreement between you and us.
    //       </p>

    //       <h5 className='sub-headline'>3. Limits on liability:</h5>
    //       <p>
    //         We work hard to provide the best Products we can and to specify clear guidelines for everyone who uses them. Our Products, however, are provided "as is", and we make no guarantees that they will always be safe, secure or error-free, or that they will function without disruptions, delays or imperfections. To the extent permitted by law, we also DISCLAIM ALL WARRANTIES, WHETHER EXPRESS OR IMPLIED, INCLUDING THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT. We do not control or direct what people and others do or say, and we are not responsible for their actions or conduct (whether online or offline) or any content that they share (including offensive, inappropriate, obscene, unlawful and other objectionable content).
    //       </p>
    //       <p>
    //         We cannot predict when issues may arise with our Products. Accordingly, our liability shall be limited to the fullest extent permitted by applicable law, and under no circumstances will we be liable to you for any lost profits, revenues, information or data, or consequential, special, indirect, exemplary, punitive or incidental damages arising out of or related to these Terms or the Micple Products, even if we have been advised of the possibility of such damages.
    //       </p>


    //       <h5 className='sub-headline'>4. Disputes</h5>
    //       <p>We try to provide clear rules so that we can limit or hopefully avoid disputes between you and us. If a dispute does arise, however, it's useful to know upfront where it can be resolved and what laws will apply.</p>
    //       <p>If you are a consumer, the laws of the country in which you reside will apply to any claim, cause of action or dispute that you have against us that arises out of or relates to these Terms or the Micple Products, and you may resolve your claim in any competent court in that country that has jurisdiction over the claim. In all other cases, you agree that the claim must be resolved exclusively in the Bangladesh. </p>

    //       <h5 className='sub-headline'> 5. Other</h5>
    //       <ul className='sub-headline-ul-design'>
    //         <li>
    //           These Terms (formerly known as the Statement of Rights and Responsibilities) make up the entire agreement between you and Micple Platforms. regarding your use of our Products. They supersede any prior agreements.
    //         </li>
    //         <li>
    //           Some of the Products that we offer are also governed by supplemental Terms. If you use any of those Products, supplemental terms will be made available and will become part of our agreement with you. For instance, if you access or use our Products for commercial or business purposes, such as buying ads, selling products, developing apps, managing a group or Page for your business, or using our measurement services, you must agree to our Commercial Terms. If you post or share content containing music, you must comply with our Music Guidelines. To the extent that any supplemental Terms conflict with these Terms, the supplemental Terms shall govern to the extent of the conflict.
    //         </li>
    //         <li>
    //           If any portion of these Terms is found to be unenforceable, the remaining portion will remain in full force and effect. If we fail to enforce any of these Terms, it will not be considered a waiver. Any amendment to or waiver of these Terms must be made in writing and signed by us.
    //         </li>
    //         <li>
    //           You will not transfer any of your rights or obligations under these Terms to anyone else without our consent.
    //         </li>
    //         <li>
    //           You may designate a person (called a legacy contact) to manage your account if it is memorialised. Only your legacy contact or a person who you have identified in a valid will or similar document expressing clear consent to disclose your content upon death or incapacity will be able to seek disclosure from your account after it is memorialised.
    //         </li>
    //         <li>
    //           These Terms do not confer any third-party beneficiary rights. All of our rights and obligations under these Terms are freely assignable by us in connection with a merger, acquisition or sale of assets, or by operation of law or otherwise.
    //         </li>
    //         <li>
    //           You should know that we may need to change the username for your account in certain circumstances (for example, if someone else claims the username and it appears unrelated to the name that you use in everyday life). We will inform you in advance if we have to do this and explain why.
    //         </li>
    //         <li>
    //           We always appreciate your feedback and other suggestions about our products and services. But you should know that we may use them without any restriction or obligation to compensate you, and we are under no obligation to keep them confidential.
    //         </li>
    //         <li>
    //           We reserve all rights not expressly granted to you.
    //         </li>
    //       </ul>


    //       <h3 className='mt-3'>5. Other Terms and Policies that may apply to you</h3>

    //       <ul className='sub-headline-ul-design'>
    //         <li>
    //           <strong>Community Standards: </strong>These guidelines outline our standards regarding the content that you post to Micple and your activity on Micple and other Micple Products.
    //         </li>
    //         <li>
    //           <strong>Commercial Terms: </strong>These Terms apply if you also access or use our Products for any commercial or business purpose, including advertising, operating an app on our Platform, using our measurement services, managing a group or a Page for a business, or selling goods or services.
    //         </li>
    //         <li>
    //           <strong>Music guidelines: </strong>These guidelines outline the policies that apply if you post or share content containing music on Micple Products.
    //         </li>

    //         <li>
    //           <strong>Micple brand resources: </strong>These guidelines outline the policies that apply to use of Micple trademarks, logos and screenshots.
    //         </li>

    //         <li>
    //           <strong>Micple Pages, Groups and Events Policy: </strong>These guidelines apply if you create or administer a Micple Page, group or event, or if you use Micple to communicate or administer a promotion.
    //         </li>

    //         <li>
    //           <strong>Advertising Policies: </strong>These policies specify what types of ad content are allowed by partners who advertise across the Micple Products.
    //         </li>
    //         <li>
    //           <strong>Self-serve Ad Terms: </strong>These Terms apply when you use self-serve advertising interfaces to create, submit or deliver advertising or other commercial or sponsored activity or content.
    //         </li>
    //         <li>
    //           <strong>Micple Platform Terms: </strong>These guidelines outline the Policies that apply to your use of our platform (for example, for developers or operators of a platform application or website or if you use social plugins).
    //         </li>
    //         <li>
    //           <strong>Developer Payment Terms:</strong> These Terms apply to developers of applications that use Micple Payments.
    //         </li>
    //         <li>
    //           <strong>Community Payment Terms: </strong>These terms apply to payments made on or through Micple Products.
    //         </li>
    //         <li>
    //           <strong>Commerce Policies: </strong>These guidelines outline the Policies that apply when you offer products and services for sale on Micple
    //         </li>
    //         <li>
    //           <strong>Live Policies: </strong>These policies apply to all content broadcast to Micple Live.
    //         </li>
    //       </ul>

    //       <p className='mt-3'>Date of last revision: 12 Feb 2022</p>


    //       <h1 className='mt-5'>Micple Search Engine Terms Of Service</h1>
    //       <h2 className='mt-2'>Terms Of Service</h2>
    //       <p className='mt-3'>Effective January 5, 2022 </p>

    //       <h3 className='mt-3'>What’s covered in these terms</h3>
    //       <p className='mt-1'>
    //         We know it’s tempting to skip these Terms of Service, but it’s important to establish what you  can expect from us as you use Micple services, and what we expect from you.
    //       </p>
    //       <p className='mt-1'>
    //         These Terms of Service reflect the way Micple’s business works, the laws that apply to our company, and certain things we’ve always believed to be true.
    //         As a result, these Terms of Service help define Micple’s relationship with you as you interact with our services.
    //         For example, these terms include the following topic headings:
    //       </p>

    //       <ul className='ul-design'>
    //         <li>What you can expect from us, which describes how we provide and develop our services</li>
    //         <li>What we expect from you, which establishes certain rules for using our services</li>
    //         <li>Content in Micple services, which describes the intellectual property rights to the content you find in our services — whether that content belongs to you, Micple, or others</li>
    //         <li>In case of problems or disagreements, which describes other legal rights you have, and what to expect in case someone violates these terms</li>
    //       </ul>

    //       <p className='mt-2'>Understanding these terms is important because, by using our services, you’re agreeing to these terms.</p>
    //       <p className='mt-2'>
    //         Besides these terms, we also publish a Privacy Policy. Although it’s not part of these terms, we encourage you to read it to better understand how you can update, manage, export, and delete your information.
    //       </p>

    //       <h3 className='mt-3'>Terms</h3>

    //       <h5 className='mt-3'>Service provider</h5>
    //       <p className='mt-1'>Micple services are provided by, and you’re contracting with:</p>
    //       <p>Micple Company Limited</p>
    //       <p>organized under the laws of the Bangladesh, and operating under the laws of the Bangladesh </p>

    //       <h5 className='mt-3'>MICPLE Company Ltd.</h5>
    //       <p>Address: House: 161/A, Madhyapara, P.O. Khilkhet-1229, Dhaka, Bangladesh.</p>
    //       <p>Phone Number:+8801976024630</p>
    //       <span>Email: <a href="manage@popular.website">manage@popular.website</a> </span>

    //       <h5 className='mt-3'>Age requirements:</h5>
    //       <p>
    //         If you’re under the age required to manage your own Micple Account, you must have your parent or legal guardian’s permission to use a Micple Account. Please have your parent or legal guardian read these terms with you.
    //       </p>
    //       <p className='mt-1'>
    //         If you’re a parent or legal guardian, and you allow your child to use the services, then these terms apply to you and you’re responsible for your child’s activity on the services.
    //       </p>

    //       <p className='mt-1'>
    //         Some Micple services have additional age requirements as described in their service-specific additional terms and policies.
    //       </p>

    //       <h5 className='mt-3'>Your relationship with Micple:</h5>
    //       <p>
    //         These terms help define the relationship between you and Micple. Broadly speaking,
    //         we give you permission to use our services if you agree to follow these terms, which reflect how Micple’s business works and how we earn money.
    //         When we speak of “Micple,” “we,” “us,” and “our,” we mean Micple Company Limited and its affiliates.
    //       </p>

    //       <h5 className='mt-3'>What you can expect from us</h5>
    //       <p>Provide a broad range of useful services</p>

    //       <p className='mt-3'>
    //         We provide a broad range of services that are subject to these terms, including:
    //       </p>

    //       <ul className='ul-design'>
    //         <li>apps and sites (like Micple Search engine)</li>
    //         <li>platforms (like Micple social media)</li>
    //         <li>integrated services (like other companies’ apps or sites)</li>
    //         <li>devices (like Micple)</li>
    //       </ul>

    //       <p className='mt-2'>Many of these services also include content that you can stream or interact with.</p>

    //       <p className='mt-2'>Our services are designed to work together, making it easier for you to move from one activity to the next.</p>

    //       <h3 className='mt-3'>What you can expect from us</h3>

    //       <p className='mt-2'>
    //         We’re constantly developing new technologies and features to improve our services. For example, we use artificial intelligence and to better detect and block spam and malware.
    //         As part of this continual improvement, we sometimes add or remove features and functionalities, increase or decrease limits to our services, and start offering new services or stop offering old ones.
    //         When a service requires or includes downloadable software, that software sometimes updates automatically on your device once a new version or feature is available.
    //         Some services let you adjust your automatic update settings.
    //       </p>
    //       <p className='mt-2'>
    //         If we make material changes that negatively impact your use of our services or if we stop offering a service, we’ll provide you with reasonable advance notice,
    //         except in urgent situations such as preventing abuse, responding to legal requirements, or addressing security and operability issues.
    //         We’ll also provide you with an opportunity to export your content from your Micple Account using Micple Takeout, subject to applicable law and policies.
    //       </p>

    //       <h5 className='mt-3'>What we expect from you</h5>
    //       <p>Follow these terms and service-specific additional terms</p>

    //       <p className='mt-3'>The permission we give you to use our services continues as long as you comply with:</p>

    //       <ul className='ul-design'>
    //         <li><strong>these terms</strong></li>
    //         <li><strong>service-specific additional terms</strong>, which could, for example, include things like additional age requirements</li>
    //       </ul>

    //       <p className='mt-2'>
    //         We also make various policies, help centers, and other resources available to you to answer common questions and to set expectations about using our services.
    //         These resources include our Privacy Policy, Copyright Help Center, Safety Center, and other pages accessible from our policies site.
    //       </p>

    //       <p className='mt-2'>
    //         Although we give you permission to use our services, we retain any intellectual property rights we have in the services.
    //       </p>

    //       <h5 className='mt-3'>Respect others</h5>
    //       <p className='mt-3'>
    //         We want to maintain a respectful environment for everyone, which means you must follow these basic rules of conduct:
    //       </p>

    //       <ul className='ul-design'>
    //         <li>comply with applicable laws, including export control, sanctions, and human trafficking laws</li>
    //         <li>respect the rights of others, including privacy and intellectual property rights</li>
    //         <li>don’t abuse or harm others or yourself (or threaten or encourage such abuse or harm) — for example, by misleading, defrauding, illegally impersonating, defaming, bullying, harassing, or stalking others</li>
    //         <li>
    //           don’t abuse, harm, interfere with, or disrupt the services — for example, by accessing or using them in fraudulent or deceptive ways, introducing malware, or spamming, hacking, or bypassing our systems or protective measures. When we index the web to bring you search results, we respect standard usage restrictions that website owners specify in their websites’ code, so we require the same when others use our services
    //         </li>
    //       </ul>

    //       <p className='mt-3'>
    //         Our service-specific additional terms and policies provide additional details about appropriate conduct that everyone using those services must follow.
    //         If you find that others aren’t following these rules, many of our services allow you to report abuse.
    //         If we act on a report of abuse, we also provide the process described in the Taking action in case of problems section.
    //       </p>

    //       <h3 className='mt-3'>Permission to use your content</h3>
    //       <p>
    //         Some of our services are designed to let you upload, submit, store, send, receive, or share your content. You have no obligation to provide any content to our services and
    //         you’re free to choose the content that you want to provide.
    //         If you choose to upload or share content, please make sure you have the necessary rights to do so and that the content is lawful.
    //       </p>

    //       <h5 className='mt-2'>License</h5>
    //       <p>
    //         Your content remains yours, which means that you retain any intellectual property rights that you have in your content.
    //         For example, you have intellectual property rights in the creative content you make, such as reviews you write. Or you may have the right to share someone else’s creative content if they’ve given you their permission.
    //       </p>

    //       <p className='mt-1'>
    //         We need your permission if your intellectual property rights restrict our use of your content. You provide Micple with that permission through this license.
    //       </p>

    //       <h5 className='mt-2'>What’s covered</h5>
    //       <p>
    //         This license covers your content if that content is protected by intellectual property rights.
    //       </p>

    //       <h5 className='mt-2'>What’s not covered</h5>
    //       <p>
    //         This license doesn’t affect your privacy rights — it’s only about your intellectual property rights
    //       </p>


    //       <h5 className='mt-2'>This license doesn’t cover these types of content:</h5>
    //       <p>
    //         publicly-available factual information that you provide, such as corrections to the address of a local business.
    //         That information doesn’t require a license because it’s considered common knowledge that everyone’s free to use.
    //       </p>

    //       <p>
    //         feedback that you offer, such as suggestions to improve our services. Feedback is covered in the Service-related communications section below.
    //       </p>

    //       <h5 className='mt-2'>Scope</h5>
    //       <p>
    //         This license is: worldwide, which means it’s valid anywhere in the world non-exclusive, which means you can license your content to others royalty-free, which means there are no monetary fees for this license
    //       </p>

    //       <h5 className='mt-2'>Rights</h5>
    //       <p>
    //         This license allows Micple to: host, reproduce, distribute, communicate, and use your content — for example, to save your content on our systems and make it accessible from anywhere you go publish,
    //         publicly perform, or publicly display your content, if you’ve made it visible to others modify and create derivative works based on your content, such as reformatting or translating it sublicense these rights to:
    //         other users to allow the services to work as designed, such as enabling you to share photos with people you choose our contractors who’ve signed agreements with us that are consistent with these terms, only for the limited purposes described in the Purpose section below
    //       </p>

    //       <h3 className='mt-3'>Purpose</h3>
    //       <p className='mt-2'>
    //         <strong style={{ fontSize: '16px' }}> This license is for the limited purpose of: </strong> operating and improving the services, which means allowing the services to work as designed and creating new features and functionalities.
    //         This includes using automated systems and algorithms to analyze your content: for spam, malware, and illegal content to recognize patterns in data, such as determining when to suggest a new album
    //         in Micple Photos to keep related photos together to customize our services for you, such as providing recommendations and personalized search results, content, and ads (which you can change or turn off in Ads Settings)
    //       </p>

    //       <h5 className='mt-3'>This analysis occurs as the content is sent, received, and when it is stored.</h5>
    //       <p className='mt-1'>
    //         Using content you’ve shared publicly to promote the services.
    //         For example, to promote a Micple app, we might quote a review you wrote. Or to promote Micple Play, we might show a screenshot of the app you offer in the Play Store.
    //       </p>

    //       <p className='mt-2'>
    //         Developing new technologies and services for Micple consistent with these terms
    //       </p>

    //       <h5 className='mt-3'>Duration</h5>
    //       <p className='mt-2'>
    //         This license lasts for as long as your content is protected by intellectual property rights.
    //       </p>

    //       <p className='mt-2'>
    //         If you remove from our services any content that’s covered by this license, then our systems will stop making that content publicly available in a reasonable amount of time.
    //         There are two exceptions: If you already shared your content with others before removing it. For example,
    //         if you shared a photo with a friend who then made a copy of it, or shared it again, then that photo may continue to appear in your friend’s Micple Account even after you remove it from your Micple Account.
    //       </p>

    //       <p className='mt-2'>
    //         If you make your content available through other companies’ services, it’s possible that search engines,
    //         including Micple Search, will continue to find and display your content as part of their search results.
    //       </p>

    //       <h3 className='mt-3'>Using Micple services</h3>

    //       <h5 className='mt-3'>Your Micple Account</h5>
    //       <p className='mt-2'>
    //         If you meet these age requirements you can create a Micple Account for your convenience.
    //         Some services require that you have a Micple Account in order to work — for example, to use email, you need a Micple Account so that you have a place to send and receive your email.
    //       </p>
    //       <p>
    //         You’re responsible for what you do with your Micple Account, including taking reasonable steps to keep your Micple Account secure, and we encourage you to regularly use the Security Checkup.
    //       </p>

    //       <h5 className='mt-3'>Using Micple services on behalf of an organization or business</h5>
    //       <p>Many organizations, such as businesses, non-profits, and schools, take advantage of our services. </p>

    //       <h5 className='mt-3'>To use our services on behalf of an organization:</h5>

    //       <ul className='ul-design'>
    //         <li>an authorized representative of that organization must agree to these terms</li>
    //         <li>your organization’s administrator may assign a Micple Account to you. That administrator might require you to follow additional rules and may be able to access or disable your Micple Account.</li>
    //       </ul>

    //       <h5 className='mt-3'>Service-related communications:</h5>

    //       <p className='mt-2'>
    //         To provide you with our services, we sometimes send you service announcements and other information. To learn more about how we communicate with you, see Micple’s Privacy Policy.
    //       </p>

    //       <p className='mt-2'>
    //         If you choose to give us feedback, such as suggestions to improve our services, we may act on your feedback without obligation to you.
    //       </p>

    //       <h3 className='mt-3'>Content in Micple services</h3>
    //       <h5 className='mt-2'>Your content</h5>
    //       <p>
    //         Some of our services give you the opportunity to make your content publicly available — for example,
    //         you might post a product or restaurant review that you wrote, or you might upload a blog post that you created.
    //       </p>

    //       <ul className='ul-design'>
    //         <li>See the Permission to use your content section for more about your rights in your content, and how your content is used in our services</li>
    //         <li>See the Removing your content section to learn why and how we might remove user-generated content from our services</li>
    //         <li>If  you think someone is infringing your intellectual property rights, you can send us notice of the infringement and we’ll take appropriate action. For example, we suspend or close the Micple Accounts of repeat copyright infringers as described in our Copyright Help Center.</li>
    //       </ul>

    //       <h5 className='mt-2'>Micple content</h5>
    //       <p>
    //         Some of our services include content that belongs to Micple. You may use Micple’s content as allowed by these terms and
    //         any service-specific additional terms, but we retain any intellectual property rights that we have in our content. Don’t remove, obscure, or alter any of our branding,
    //         logos, or legal notices. If you want to use our branding or logos, please see the Micple Brand Permissions page.
    //       </p>

    //       <h5 className='mt-2'>Other content</h5>
    //       <p>
    //         Finally, some of our services give you access to content that belongs to other people or organizations — for example,
    //         a store owner’s description of their own business, or a newspaper article displayed in Micple News. You may not use this content without that person or organization’s permission,
    //         or as otherwise allowed by law. The views expressed in other people or organizations’ content are theirs, and don’t necessarily reflect Micple’s views.
    //       </p>

    //       <h5 className='mt-2'>Software in Micple services</h5>
    //       <p>Some of our services include downloadable software. We give you permission to use that software as part of the services.</p>

    //       <p className='mt-3'>The license we give you is:</p>

    //       <ul className='ul-design'>
    //         <li>worldwide, which means it’s valid anywhere in the world</li>
    //         <li>non-exclusive, which means that we can license the software to others</li>
    //         <li>royalty-free, which means there are no monetary fees for this license</li>
    //         <li>personal, which means it doesn’t extend to anyone else</li>
    //         <li>non-assignable, which means you’re not allowed to assign the license to anyone else</li>
    //       </ul>

    //       <p className='mt-3'>
    //         Some of our services include software that’s offered under open source license terms that we make available to you.
    //         Sometimes there are provisions in the open source license that explicitly override parts of these terms, so please be sure to read those licenses.
    //       </p>

    //       <p className='mt-3'>
    //         You may not copy, modify, distribute, sell, or lease any part of our services or software.
    //       </p>

    //       <h3 className='mt-3'>In case of problems or disagreements</h3>
    //       <p>Both the law and these terms give you the right to (1) a certain quality of service, and (2) ways to fix problems if things go wrong.</p>

    //       <h5 className='mt-2'>Warranty</h5>
    //       <p>
    //         We provide our services using reasonable skill and care. If we don’t meet the quality level described in this warranty, you agree to tell us and we’ll work with you to try to resolve the issue.
    //       </p>

    //       <h5 className='mt-2'>Disclaimers</h5>
    //       <p>
    //         The only commitments we make about our services (including the content in the services, the specific functions of our services, or their reliability, availability, or ability to meet your needs) are
    //         provided in (1) the Warranty section; (2) the service-specific additional terms; and (3) laws that can’t be limited by these terms.
    //       </p>

    //       <h5 className='mt-3'>Liabilities</h5>
    //       <h5 className='mt-1'>For all users</h5>
    //       <p>
    //         Both the law and these terms try to strike a balance as to what you or Micple can claim from the other in case of problems. That’s why the law allows us to limit certain liabilities — but not others — under these terms.
    //       </p>

    //       <p className='mt-2'>
    //         These terms only limit our responsibilities as allowed by applicable law. These terms don’t limit liability for fraud, fraudulent misrepresentation, or death or personal injury caused by negligence or willful misconduct.
    //       </p>

    //       <p className='mt-2'>
    //         Other than the liabilities described above, Micple is liable only for its breaches of these terms or applicable service-specific additional terms, subject to applicable law.
    //       </p>

    //       <h5 className='mt-3'>For business users and organizations only</h5>
    //       <h5 className='mt-1'>If you’re a business user or organization:</h5>

    //       <ul className='ul-design'>
    //         <li>
    //           To the extent allowed by applicable law, you’ll indemnify Micple and its directors, officers, employees, and
    //           contractors for any third-party legal proceedings (including actions by government authorities) arising out of or relating to your unlawful use of the services or violation of these terms or service-specific additional terms. This indemnity covers any liability or expense arising from claims,
    //           losses, damages, judgments, fines, litigation costs, and legal fees.
    //         </li>
    //         <li>
    //           If you’re legally exempt from certain responsibilities, including indemnification, then those responsibilities don’t apply to you under these terms.
    //         </li>
    //         <li>
    //           <strong>Micple won’t be responsible for the following liabilities:</strong>
    //         </li>
    //         <li>loss of profits, revenues, business opportunities, goodwill, or anticipated savings</li>
    //         <li>indirect or consequential loss</li>
    //         <li>punitive damages</li>
    //       </ul>

    //       <h5 className='mt-3'>Taking action in case of problems</h5>
    //       <p>
    //         Before taking action as described below, we’ll provide you with advance notice when reasonably possible, describe the reason for our action, and give you an opportunity to fix the problem, unless we reasonably believe that doing so would:
    //       </p>

    //       <ul className='ul-design'>
    //         <li>cause harm or liability to a user, third party, or Micple</li>
    //         <li>violate the law or a legal enforcement authority’s order</li>
    //         <li>compromise an investigation</li>
    //         <li>compromise the operation, integrity, or security of our services</li>
    //       </ul>

    //       <h5 className='mt-3'>Removing your content</h5>
    //       <p>If we reasonably believe that any of your content (1) breaches these terms, service-specific additional terms or policies, </p>
    //       <p className='mt-2'>(2) violates applicable law, or </p>
    //       <p className='mt-2'>
    //         (3) could harm our users, third parties, or Micple, then we reserve the right to take down some or all of that content in accordance with applicable law. Examples include child pornography,
    //         content that facilitates human trafficking or harassment, terrorist content, and content that infringes someone else’s intellectual property rights.
    //       </p>

    //       <h5 className='mt-3'>Suspending or terminating your access to Micple services</h5>
    //       <p>
    //         Micple reserves the right to suspend or terminate your access to the services or delete your Micple Account if any of these things happen:
    //       </p>

    //       <ul className='ul-design'>
    //         <li>you materially or repeatedly breach these terms, service-specific additional terms or policies</li>
    //         <li>we’re required to do so to comply with a legal requirement or a court order</li>
    //         <li>
    //           we reasonably believe that your conduct causes harm or liability to a user,
    //           third party, or Micple — for example, by hacking, phishing, harassing, spamming, misleading others, or scraping content that doesn’t belong to you
    //         </li>
    //       </ul>

    //       <p className='mt-2'>
    //         For more information about why we disable accounts and what happens when we do, see this Help Center page. If you believe your Micple Account has been suspended or terminated in error, you can appeal.
    //       </p>

    //       <p className='mt-2'>
    //         Of course, you’re always free to stop using our services at any time. If you do stop using a service, we’d appreciate knowing why so that we can continue improving our services.
    //       </p>

    //       <p className='mt-2'>
    //         Settling disputes, governing law, and courts
    //       </p>
    //       <p>For information about how to contact Micple, please visit our contact page.</p>

    //       <p className='mt-2'>
    //         Bangladeshi law will govern all disputes arising out of or relating to these terms, service-specific additional terms, or any related services, regardless of conflict of laws rules.
    //       </p>
    //       <p className='mt-2'>
    //         These disputes will be resolved exclusively in the Bangladeshi courts.
    //       </p>
    //       <p className='mt-2'>you and Micple consent to personal jurisdiction in those courts.</p>
    //       <p>
    //         To the extent that applicable local law prevents certain disputes from being resolved in a Bangladeshi court,
    //         then you can file those disputes in your local courts. Likewise, if applicable local law prevents
    //         your local court from applying Bangladeshi law to resolve these disputes, then these disputes will be governed by the applicable local laws of your country, state, or other place of residence.
    //       </p>

    //       <h5 className='mt-3'>About these terms</h5>
    //       <p>
    //         By law, you have certain rights that can’t be limited by a contract like these terms of service. These terms are in no way intended to restrict those rights.
    //       </p>

    //       <p className='mt-3'>
    //         These terms describe the relationship between you and Micple. They don’t create any legal rights for other people or organizations, even if others benefit from that relationship under these terms.
    //       </p>
    //       <p className='mt-3'>
    //         We want to make these terms easy to understand, so we’ve used examples from our services. But not all services mentioned may be available in your country.
    //       </p>

    //       <p className='mt-3'>
    //         If these terms conflict with the service-specific additional terms, the additional terms will govern for that service
    //       </p>
    //       <p className='mt-3'>
    //         If it turns out that a particular term is not valid or enforceable, this will not affect any other terms.
    //       </p>

    //       <p className='mt-3'>
    //         If you don’t follow these terms or
    //         the service-specific additional terms, and we don’t take action right away, that doesn’t mean we’re giving up any rights that we may have, such as taking action in the future.
    //       </p>

    //       <p className='mt-3'>
    //         We may update these terms and service-specific additional terms
    //       </p>

    //       <p className='mt-3'>
    //         (1) to reflect changes in our services or how we do business — for example, when we add new services, features, technologies, pricing, or benefits (or remove old ones),
    //       </p>

    //       <p className='mt-3'>
    //         (2) for legal, regulatory, or security reasons, or
    //       </p>

    //       <p className='mt-3'>
    //         (3) to prevent abuse or harm.
    //       </p>

    //       <p className='mt-3'>
    //         If we materially change these terms or service-specific additional terms, we’ll provide you with reasonable advance notice and the opportunity to review the changes, except
    //       </p>
    //       <p className='mt-3'>
    //         (1) when we launch a new service or feature, or
    //       </p>
    //       <p className='mt-3'>
    //         (2) in urgent situations, such as preventing ongoing abuse or responding to legal requirements.
    //         If you don’t agree to the new terms, you should remove your content and stop using the services.
    //         You can also end your relationship with us at any time by closing your Micple Account.

    //       </p>


    //     </div>
    //   </div>
    // </div>

    // </Content>
    // {/* </Dialog> */}
  )
}

export default Terms