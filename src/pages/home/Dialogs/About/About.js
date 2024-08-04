import React from "react";

import { H3, Ul } from "./style";

export default ({ tab }) => {
  return (
    <div role="tabpanel" hidden={tab !== 0}>
      <H3>
        Micple's a search engine with communication management and all in one
        platform
      </H3>
      <Ul>
        <li>
          Our mission is to organize the world’s information and make it
          universally accessible and useful. This platform only for most of the
          very brilliant and higher person, not for inefficient person. When you
          use our services, you’re trusting us with your information. We
          understand that this is a big responsibility and we work hard to
          protect your information and put you in control.
        </li>

        <H3>How Micple Search works?</H3>
        <Ul>
          <li>
            Every time you search, there are thousands, sometimes millions, of
            webpages with helpful information. How Micple figures out which
            results to show starts long before you even type, and is guided by a
            commitment to you to provide the best information.
          </li>
        </Ul>
        <H3>Organizing the content of the web</H3>
        <Ul>
          <li>
            Even before you search, Micple organizes information about webpages
            in our Search index. The index is like a library, except it contains
            more info than in all the world’s together.
          </li>
        </Ul>
        <H3>Instantly matching your search</H3>
        <Ul>
          <li>
            In a fraction of a second, Micple search algorithms sort through
            hundreds of billions of webpages in our Search index to find the
            most relevant, useful results for what you’re looking.
          </li>
        </Ul>
        <H3>Presenting results in helpful ways</H3>
        <Ul>
          <li>
            To help you find what you’re looking for quickly, Micple provides
            results in many useful formats. Whether presented as a map with
            directions, images, videos or stories, we’re constantly evolving
            with new ways to present information.
          </li>
        </Ul>
        <H3>We only sell ads, not search results</H3>
        <Ul>
          <li>
            While advertisers can pay to be displayed in clearly marked sections
            of the page, no one can buy better placement in the search results.
            We know Search can always be better. That’s why Micple engineers
            spend every day testing it, conducting hundreds of thousands of
            experiments every year, resulting in thousands of improvements.
          </li>
        </Ul>
      </Ul>
    </div>
  );
};
