import React from 'react';

import { H3, Ul } from './style';

export default ({ tab }) => {
  return (
    <div role='tabpanel' hidden={tab !== 2}>
      <H3>What you can expect from us</H3>
      <Ul>
        <li>
          We don’t charge you to use Micple or the other products and services covered by these Terms. Instead, businesses and organisations
          pay us to show you ads for their products and services By using our Products, you agree that we can show you ads that we think
          will be relevant to you and your interests. We use your personal data to help determine which ads to show you. We don’t sell your
          personal data to advertisers, and we don’t share information that directly identifies you (such as your name, email address or
          other contact information with advertisers unless you give us specific permission. Instead, advertisers can tell us things such as
          the kind of audience that they want to see their ads, and we show those ads to people who may be interested. We provide
          advertisers with reports about the performance of their ads that help them understand how people are interacting with their
          content
        </li>

        <H3>The services we provide</H3>
        <Ul>
          <li>
            Our mission is to give people the power to build community and bring the world closer together. your experience on Micple is
            unlike anyone else's: from the posts, stories, events, ads and other content that you see in News Feed or our video platform to
            the Pages that you follow and other features that you might use, such as Trending, Marketplace and search. We use the data that
            we have – for example, about the connections you make, the choices and settings you select and what you share and do on and off
            our Products – to personalise your experience.
          </li>
        </Ul>
        <H3>How our services are funded</H3>
        <Ul>
          <li>
            Instead of paying to use Micple and the other products and services we offer, by using the Micple Products covered by these
            Terms, you agree that we can show you ads that businesses and organisations pay us to promote on and off the Micple Company
            Products. We use your personal data, such as information about your activity and interests, to show you ads that are more
            relevantto.
          </li>
        </Ul>
        <H3>Your commitments to our community</H3>
        <Ul>
          <li>
            We provide these services to you and others to help advance our mission. In exchange, we need you to make the following
            commitments When people stand behind their opinions and actions, our community is safer and more accountable. For this reason,
            you must: use the same name that you use in everyday life; provide accurate information about yourself; create only one account
            (your own) and use your timeline for personal purposes; andnot share your password, give access to your account to others or
            transfer your account. We try to make Micple broadly available to everyone, but you cannot use Micple if: You are under 18 years
            old (or the minimum legal age in your country to use our Products). You are a convicted sex offender. We've previously disabled
            your account for violations of our Terms or Policies. You are prohibited from receiving our products, services or software under
            applicable laws.
          </li>
        </Ul>
        <H3>Additional provisions</H3>
        <Ul>
          <li>
            We work constantly to improve our services and develop new features to make our Products better for you and our community. As a
            result, we may need to update these Terms from time to time to accurately reflect our services and practices. We will only make
            changes if the provisions are no longer appropriate or if they are incomplete, and only if the changes are reasonable and take
            due account of your interests.
          </li>
        </Ul>
        <H3>Account suspension or termination</H3>
        <Ul>
          <li>
            We want Micple to be a place where people feel welcome and safe to express themselves and share their thoughts and ideas. If we
            determine that you have clearly, seriously or repeatedly breached our Terms or Policies, including in particular our Community
            Standards, we may suspend or permanently disable access to your account. We may also suspend or disable your account if you
            repeatedly infringe other people's intellectual propertyrights or where we are required to do so for legal reasons.
          </li>
        </Ul>
      </Ul>
    </div>
  );
};
