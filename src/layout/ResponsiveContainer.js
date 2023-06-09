import { createMedia } from '@artsy/fresnel';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { InView } from 'react-intersection-observer';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Sidebar,
} from 'semantic-ui-react';

const { MediaContextProvider, Media } = createMedia({
    breakpoints: {
      mobile: 0,
      tablet: 768,
      computer: 1024,
    },
  })
  
  /* Heads up!
   * HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled
   * components for such things.
   */
  const HomepageHeading = ({ mobile }) => (
    <Container text>
      <Header
        as='h1'
        content='Imagine-a-Company'
        inverted
        style={{
          fontSize: mobile ? '2em' : '4em',
          fontWeight: 'normal',
          marginBottom: 0,
          marginTop: mobile ? '1.5em' : '3em',
        }}
      />
      <Header
        as='h2'
        content='Do whatever you want when you want to.'
        inverted
        style={{
          fontSize: mobile ? '1.5em' : '1.7em',
          fontWeight: 'normal',
          marginTop: mobile ? '0.5em' : '1.5em',
        }}
      />
      <Button primary size='huge'>
        Get Started
        <Icon name='right arrow' />
      </Button>
    </Container>
  )
  
  HomepageHeading.propTypes = {
    mobile: PropTypes.bool,
  }
  
  /* Heads up!
   * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
   * It can be more complicated, but you can create really flexible markup.
   */
  class DesktopContainer extends Component {
    state = {}
  
    toggleFixedMenu = (inView) => this.setState({ fixed: !inView })
  
    render() {
      const { children } = this.props
      const { fixed } = this.state
  
      return (
        <Media greaterThan='mobile'>
          <InView onChange={this.toggleFixedMenu}>
            <Segment
              inverted
              textAlign='center'
              style={{ minHeight: 80, padding: '1em 0em' }}
              vertical
            >
              <Menu
                fixed={fixed ? 'top' : null}
                inverted={!fixed}
                pointing={!fixed}
                secondary={!fixed}
                size='large'
              >
                <Container>
                  <Menu.Item as='a' active>
                    Dashboard
                  </Menu.Item>
                  <Menu.Item position='right'> 
                    <Button as='a' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
                      Log Out
                    </Button>
                  </Menu.Item>
                </Container>
              </Menu>
            </Segment>
          </InView>
  
          {children}
        </Media>
      )
    }
  }
  
  DesktopContainer.propTypes = {
    children: PropTypes.node,
  }
  
  class MobileContainer extends Component {
    state = {}
  
    handleSidebarHide = () => this.setState({ sidebarOpened: false })
  
    handleToggle = () => this.setState({ sidebarOpened: true })
  
    render() {
      const { children } = this.props
      const { sidebarOpened } = this.state
  
      return (
        <Media as={Sidebar.Pushable} at='mobile'>
          <Sidebar.Pushable>
            <Sidebar
              as={Menu}
              animation='overlay'
              inverted
              onHide={this.handleSidebarHide}
              vertical
              visible={sidebarOpened}
            >
              <Menu.Item as='a' active>
              Dashboard
              </Menu.Item>
            </Sidebar>
  
            <Sidebar.Pusher dimmed={sidebarOpened}>
              <Segment
                inverted
                textAlign='center'
                style={{ minHeight: 80, padding: '1em 0em' }}
                vertical
              >
                <Container>
                  <Menu inverted pointing secondary size='large'>
                    <Menu.Item onClick={this.handleToggle}>
                      <Icon name='sidebar' />
                    </Menu.Item>
                    <Menu.Item position='right'>
                      
                      <Button as='a' inverted>
                        Log Out
                      </Button>
                    </Menu.Item>
                  </Menu>
                </Container>
              </Segment>
  
              {children}
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </Media>
      )
    }
  }
  
  MobileContainer.propTypes = {
    children: PropTypes.node,
  }
  
  const ResponsiveContainer = ({ children }) => (
    /* Heads up!
     * For large applications it may not be best option to put all page into these containers at
     * they will be rendered twice for SSR.
     */
    <MediaContextProvider>
      <DesktopContainer>{children}</DesktopContainer>
      <MobileContainer>{children}</MobileContainer>
    </MediaContextProvider>
  )
  
  ResponsiveContainer.propTypes = {
    children: PropTypes.node,
  }
  

  export default ResponsiveContainer