import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: "theme.palette.background.default",
    padding: theme.spacing(5),
    
  },
  root: {
    flexGrow: 1,
  },
  searchs: {
    justifyContent: 'center',
    display: 'flex',
    marginTop: '40px',
    },
  searchb: {  
    marginBottom: '10px',
    height: '50%',
    width: '100%',
    paddingLeft: '10px',
    border: "3px solid #5f9ea0",
    borderRadius:"1.5em",
    
    },
}));
