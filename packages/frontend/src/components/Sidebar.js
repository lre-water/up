import React, { useState } from "react";
import styled from "styled-components/macro";
import { darken, rgba } from "polished";
import { NavLink, withRouter } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import "../vendor/perfect-scrollbar.css";
import { spacing } from "@mui/system";

import {
  Avatar,
  Badge,
  Box as MuiBox,
  Chip,
  Collapse,
  Drawer as MuiDrawer,
  Grid,
  List as MuiList,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

import { ExpandLess, ExpandMore } from "@mui/icons-material";

import { sidebarRoutes as routes } from "../routes/index";
import { useAuth0 } from "@auth0/auth0-react";
import UserDropdown from "./UserDropdown";
import { customSecondary } from "../theme/variants";

const Box = styled(MuiBox)(spacing);

const Drawer = styled(MuiDrawer)`
  border-right: 0;

  > div {
    border-right: 0;
  }
`;

const Scrollbar = styled(PerfectScrollbar)`
  background-color: ${(props) => props.theme.sidebar.background};
  border-right: 1px solid rgba(0, 0, 0, 0.12);
`;

const List = styled(MuiList)`
  background-color: ${(props) => props.theme.sidebar.background};
`;

const Items = styled.div`
  padding-top: ${(props) => props.theme.spacing(2.5)};
  padding-bottom: ${(props) => props.theme.spacing(2.5)};
`;

const Brand = styled(ListItem)`
  font-size: ${(props) => props.theme.typography.h5.fontSize};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
  color: ${(props) => props.theme.sidebar.header.color};
  background-color: ${(props) => props.theme.sidebar.header.background};
  font-family: ${(props) => props.theme.typography.fontFamily};
  min-height: 56px;
  padding-left: ${(props) => props.theme.spacing(6)};
  padding-right: ${(props) => props.theme.spacing(6)};
  justify-content: flex-start;
  cursor: pointer;

  ${(props) => props.theme.breakpoints.up("sm")} {
    min-height: 64px;
  }

  &:hover {
    background-color: ${(props) => props.theme.sidebar.header.background};
  }
`;

const BrandIcon = styled.img`
  margin-right: ${(props) => props.theme.spacing(2)};
`;

const Category = styled(ListItem)`
  padding-top: ${(props) => props.theme.spacing(3)};
  padding-bottom: ${(props) => props.theme.spacing(3)};
  padding-left: ${(props) => props.theme.spacing(8)};
  padding-right: ${(props) => props.theme.spacing(7)};
  font-weight: ${(props) => props.theme.typography.fontWeightRegular};

  svg {
    color: ${(props) => props.theme.sidebar.color};
    font-size: 20px;
    width: 20px;
    height: 20px;
    opacity: 0.5;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.08);
  }

  &.${(props) => props.activeClassName} {
    background-color: ${(props) =>
      darken(0.03, props.theme.sidebar.background)};

    span {
      color: ${(props) => props.theme.sidebar.color};
    }
  }
`;

const CategoryText = styled(ListItemText)`
  margin: 0;
  span {
    color: ${(props) => props.theme.sidebar.color};
    font-size: ${(props) => props.theme.typography.body1.fontSize}px;
    padding: 0 ${(props) => props.theme.spacing(4)};
  }
`;

const CategoryIconLess = styled(ExpandLess)`
  color: ${(props) => rgba(props.theme.sidebar.color, 0.5)};
`;

const CategoryIconMore = styled(ExpandMore)`
  color: ${(props) => rgba(props.theme.sidebar.color, 0.5)};
`;

const Link = styled(ListItem)`
  padding-left: ${(props) => props.theme.spacing(17.5)};
  padding-top: ${(props) => props.theme.spacing(2)};
  padding-bottom: ${(props) => props.theme.spacing(2)};

  span {
    color: ${(props) => rgba(props.theme.sidebar.color, 0.7)};
  }

  &:hover span {
    color: ${(props) => rgba(props.theme.sidebar.color, 0.9)};
  }

  &:hover {
    background-color: ${(props) =>
      darken(0.015, props.theme.sidebar.background)};
  }

  &.${(props) => props.activeClassName} {
    background-color: ${(props) =>
      darken(0.03, props.theme.sidebar.background)};

    span {
      color: ${(props) => props.theme.sidebar.color};
    }
  }
`;

const LinkText = styled(ListItemText)`
  color: ${(props) => props.theme.sidebar.color};
  span {
    font-size: ${(props) => props.theme.typography.body1.fontSize}px;
  }
  margin-top: 0;
  margin-bottom: 0;
`;

const LinkBadge = styled(Chip)`
  font-size: 11px;
  font-weight: ${(props) => props.theme.typography.fontWeightBold};
  height: 20px;
  position: absolute;
  right: 28px;
  top: 8px;
  background: ${(props) => props.theme.sidebar.badge.background};

  span.MuiChip-label,
  span.MuiChip-label:hover {
    cursor: pointer;
    color: ${(props) => props.theme.sidebar.badge.color};
    padding-left: ${(props) => props.theme.spacing(2)};
    padding-right: ${(props) => props.theme.spacing(2)};
  }
`;

const CategoryBadge = styled(LinkBadge)`
  top: 12px;
`;

const SidebarSection = styled(Typography)`
  color: ${() => customSecondary[500]};
  padding: ${(props) => props.theme.spacing(4)}
    ${(props) => props.theme.spacing(7)} ${(props) => props.theme.spacing(1)};
  opacity: 0.9;
  font-weight: ${(props) => props.theme.typography.fontWeightBold};
  display: block;
`;

const SidebarFooter = styled.div`
  background-color: ${(props) =>
    props.theme.sidebar.footer.background} !important;
  padding: ${(props) => props.theme.spacing(2.75)}
    ${(props) => props.theme.spacing(4)};
  border-right: 1px solid rgba(0, 0, 0, 0.12);
`;

const SidebarFooterText = styled(Typography)`
  color: ${(props) => props.theme.sidebar.footer.color};
`;

const SidebarFooterSubText = styled(Typography)`
  color: ${(props) => props.theme.sidebar.footer.color};
  font-size: 0.7rem;
  display: block;
  padding: 1px;
`;

const SidebarFooterBadge = styled(Badge)`
  margin-right: ${(props) => props.theme.spacing(1)};
  span {
    background-color: ${(props) =>
      props.theme.sidebar.footer.online.background};
    border: 1.5px solid ${(props) => props.theme.palette.common.white};
    height: 12px;
    width: 12px;
    border-radius: 50%;
  }
`;

const initOpenRoutes = (location) => {
  /* Open collapse element that matches current url */
  const pathName = location.pathname;

  let _routes = {};

  routes.forEach((route, index) => {
    const children = route.children || [];
    const isOpen = route.open;
    const isHome = route.containsHome && pathName === "/";
    let isActive =
      pathName.indexOf(route.path) === 0 ||
      children.filter((x) => x.path === pathName).length > 0;

    _routes = Object.assign({}, _routes, {
      [index]: isActive || isOpen || isHome,
    });
  });

  return _routes;
};

const SidebarCategory = ({
  name,
  icon,
  classes,
  isOpen,
  isCollapsable,
  badge,
  ...rest
}) => {
  return (
    <Category {...rest}>
      {icon}
      <CategoryText>{name}</CategoryText>
      {isCollapsable ? (
        isOpen ? (
          <CategoryIconMore />
        ) : (
          <CategoryIconLess />
        )
      ) : null}
      {badge ? <CategoryBadge label={badge} /> : ""}
    </Category>
  );
};

const SidebarLink = ({ name, to, badge, icon }) => {
  return (
    <Link
      button
      dense
      component={NavLink}
      exact
      to={to}
      activeClassName="active"
    >
      <LinkText>{name}</LinkText>
      {badge ? <LinkBadge label={badge} /> : ""}
    </Link>
  );
};

const Sidebar = ({
  classes,
  staticContext,
  location,
  drawerOpen = true,
  ...rest
}) => {
  const { isAuthenticated, user } = useAuth0();

  const [openRoutes, setOpenRoutes] = useState(() => initOpenRoutes(location));

  const toggle = (index) => {
    // Collapse all elements
    Object.keys(openRoutes).forEach(
      (item) =>
        openRoutes[index] ||
        setOpenRoutes((openRoutes) =>
          Object.assign({}, openRoutes, { [item]: false })
        )
    );

    // Toggle selected element
    setOpenRoutes((openRoutes) =>
      Object.assign({}, openRoutes, { [index]: !openRoutes[index] })
    );
  };

  return (
    <Drawer
      variant="permanent"
      {...rest}
      style={{
        pointerEvents: drawerOpen ? "auto" : "none",
      }}
    >
      <Brand
        component={NavLink}
        to="/"
        button
        style={{
          pointerEvents: "all",
        }}
      >
        <BrandIcon
          src={`/static/img/lrewater-logo-square.svg`}
          width="32"
          height="32"
          alt="LRE Icon"
        />{" "}
        <Box ml={1} style={{ display: "flex" }}>
          Unified Platform{" "}
        </Box>
      </Brand>
      <Scrollbar
        style={{
          display: drawerOpen ? "block" : "none",
          pointerEvents: drawerOpen ? "auto" : "none",
        }}
      >
        <List disablePadding>
          <Items>
            {routes.map((category, index) => {
              const VisibilityFilter =
                category.visibilityFilter || React.Fragment;

              return (
                <VisibilityFilter key={index}>
                  <React.Fragment>
                    {category.header ? (
                      <SidebarSection>{category.header}</SidebarSection>
                    ) : null}

                    {category.children && category.icon ? (
                      <React.Fragment key={index}>
                        <SidebarCategory
                          isOpen={!openRoutes[index]}
                          isCollapsable={true}
                          name={category.id}
                          icon={category.icon}
                          button={true}
                          onClick={() => toggle(index)}
                        />

                        <Collapse
                          in={openRoutes[index]}
                          timeout="auto"
                          unmountOnExit
                        >
                          {category.children.map((route, index) => (
                            <SidebarLink
                              key={index}
                              name={route.name}
                              to={route.path}
                              icon={route.icon}
                              badge={route.badge}
                            />
                          ))}
                        </Collapse>
                      </React.Fragment>
                    ) : category.icon ? (
                      <SidebarCategory
                        isCollapsable={false}
                        name={category.id}
                        to={category.path}
                        activeClassName="active"
                        component={NavLink}
                        icon={category.icon}
                        exact
                        button
                        badge={category.badge}
                      />
                    ) : null}
                  </React.Fragment>
                </VisibilityFilter>
              );
            })}
          </Items>
        </List>
      </Scrollbar>
      {isAuthenticated && (
        <SidebarFooter
          style={{
            display: drawerOpen ? "block" : "none",
            pointerEvents: drawerOpen ? "auto" : "none",
          }}
        >
          <Grid container spacing={2}>
            <Grid item>
              <UserDropdown>
                <SidebarFooterBadge
                  overlap="circular"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  variant="dot"
                >
                  <Avatar alt={user.nickname} src={user.picture} />
                </SidebarFooterBadge>
              </UserDropdown>
            </Grid>
            <Grid item>
              <SidebarFooterText variant="body2">
                {user.nickname}
              </SidebarFooterText>
              <SidebarFooterSubText variant="caption">
                {user.email}
              </SidebarFooterSubText>
            </Grid>
          </Grid>
        </SidebarFooter>
      )}
    </Drawer>
  );
};

export default withRouter(Sidebar);
