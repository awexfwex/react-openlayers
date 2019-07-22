import { createStyles, Theme } from "@material-ui/core";

const drawerWidth = 240;

export default (theme: Theme) => createStyles({
  categoryRoot: {
    position: 'relative',
    width: '100%'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  }
})