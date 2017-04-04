import React from 'react';
import { Link } from 'react-router';
import sortBy from 'lodash/sortBy';
import { prefixLink } from 'gatsby-helpers';
import { Container } from 'react-responsive-grid';
import { rhythm } from 'utils/typography';
import Helmet from 'react-helmet';
import access from 'safe-access';
import { config } from 'config';
import include from 'underscore.string/include';
import Particles from '../components/Particles';

class BlogIndex extends React.Component {
  render() {
    const pageLinks = [];
    // Sort pages.
    const sortedPages = sortBy(this.props.route.pages, page =>
      access(page, 'data.date')).reverse();
    sortedPages.forEach(page => {
      // Posts are those with md extension that are not 404 pages OR have a date (meaning they're a react component post).
      if (
        (access(page, 'file.ext') === 'md' && !include(page.path, '/404')) ||
        access(page, 'data.date')
      ) {
        const title = access(page, 'data.title') || page.path;
        pageLinks.push(
          <li
            key={page.path}
            style={{
              marginBottom: rhythm(1 / 4),
            }}
          >
            <Link style={{ boxShadow: 'none' }} to={prefixLink(page.path)}>
              {title}
            </Link>

          </li>
        );
      }
    });
    return (
      <div>
        <Helmet
          title="Jared Palmer"
          meta={[
            {
              name: 'description',
              content: 'Jared Palmer - Software Engineer at The Palmer Group',
            },
            {
              name: 'keywords',
              content: 'html, css, javascript, engineering, react, nodejs',
            },
          ]}
        />
        <Container
          style={{
            maxWidth: rhythm(24),
            padding: `${rhythm(0.75)} ${rhythm(0.75)} ${rhythm(1.5)}`,
          }}
        >
          <ul>
            {pageLinks}
          </ul>
        </Container>
        <Particles />
      </div>
    );
  }
}

BlogIndex.propTypes = {
  route: React.PropTypes.object,
};

export default BlogIndex;
