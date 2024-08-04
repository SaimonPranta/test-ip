import React from 'react';

import { H3, Ul } from './style';

export default ({ tab }) => {
  return (
    <div role='tabpanel' hidden={tab !== 1}>
      <H3>What kinds of information do we collect</H3>
      <Ul>
        <li>
          We collect the content, communications and other information you provide when you use our Products, including when you sign up for
          an account, create or share content and message or communicate with others. This can include information in or about the content
          that you provide (e.g. metadata), such as the location of a photo or the date a file was created. It can also include what you see
          through features that we provide, such as our camera, so we can do things such as suggest masks and filters that you might like,
          or give you tips on using camera formats. Our systems automatically process content and communications that you and others provide
          to analyse context and what's in them for the purposes described
        </li>
      </Ul>
      <H3>Introduction</H3>
      <Ul>
        <li>
          Every day, people use Micple to share their experiences, connect with friends and family, and build communities. We are a service
          for more than two billion people to freely express themselves across countries and cultures and in dozens of languages.
        </li>

        <H3>Authenticity</H3>
        <Ul>
          <li>
            We want to make sure that the content people are seeing on Micple is authentic. We believe that authenticity creates a better
            environment for sharing, and that's why we don't want people using Micple to misrepresent who they are or what they're doing.
          </li>
        </Ul>
        <H3>Safety</H3>
        <Ul>
          <li>
            We are committed to making Micple a safe place. Expression that threatens people has the potential to intimidate, exclude or
            silence others and isn't allowed on Micple.
          </li>
        </Ul>
        <H3>Privacy</H3>
        <Ul>
          <li>
            We are committed to protecting personal privacy and information. Privacy gives people the freedom to be themselves and to choose
            how and when to share on Micple and to connect more easily.
          </li>
        </Ul>
        <H3>Dignity</H3>
        <Ul>
          <li>
            We believe that all people are equal in dignity and rights. We expect that people will respect the dignity of others and not
            harass or degrade others. Our Community Standards apply to everyone, all around the world, and to all types of content. They're
            designed to be comprehensive – for example, content that might not be considered hateful may still be removed for violating a
            different policy. We recognise that words mean different things or affect people differently depending on their local community,
            language or background. We work hard to account for these nuances while also applying our policies consistently and fairly to
            people and their expression. In the case of certain policies, we require more information and/or context to enforce in line with
            our Community Standards.
          </li>
        </Ul>
      </Ul>
    </div>
  );
};
