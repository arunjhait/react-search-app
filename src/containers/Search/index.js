import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Skeletons from '../../components/Skeletons';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getArticles, updateArticle } from '../../store/actions';
import Articles from '../../components/Articles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

const useStyles = (theme) => ({
  root: {
    alignItems: 'center',
    justifyContent: 'space-around',
    color: theme.palette.primary.main,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    margin: '0 auto',
    width: '50%',
    fontWeight: 'bold',
    [theme.breakpoints.down('md')]: {
      width: '75%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '95%',
    },
  },
  autocomplete: {
    width: '100%'
  }
});

const Search = (props) => {

  const [search, setSearch] = useState(false);
  const [update, setUpdate] = useState(false);

  const { classes, loading, getArticles, articles } = props;

  useEffect(() => {
    if (articles && articles.length === 0) {
      getArticles(); // Get the Artilces on intially page load
    }
  });

  const onSave = (article) => {
    props.updateArticle(article);
    setSearch('');
    setUpdate(parseInt((Math.random()*10))%5); // To update the Autocomplete
  };

  /**
   * Get the value of Autocomplete and store in state to filter
  */
  const handleChange = (title) => {
    setSearch(title.inputProps.value);
  };

  /**
   * Filters the searched Article
   */
  const filterResults = () => {
    const { articles } = props;
    if (!search) {
      return articles;
    }
    return articles.filter((article) => article.title && article.title.includes(search));
  };


  /**
   * Loop the filtered article and display on page
   */
  const filterredArticles = () => {
    const getFiltered = filterResults();
    const totalArticles = getFiltered.length;
    return totalArticles ? 
      getFiltered.map((item) => <Articles onSave={onSave} key={item.id} {...item} /> )
      : <p>No Article Found.</p>
  };

  return (
    <Container>
      {loading ? (
        <Skeletons />
      ) : (
          <div>
            <div className={classes.root}>
              <Autocomplete
                options={articles}
                getOptionLabel={(articles) => articles.title}
                className={classes.autocomplete}
                key={update}
                renderInput={(params) => <TextField {...params} onChange={handleChange({ ...params })} label="Enter the Title to Get Result" variant="outlined" />}
              />
            </div>
            {filterResults().length ? <p align="right">{`${filterResults().length} Results`}</p> : ''}
            <Grid container justify="center" spacing={2}>
              {filterredArticles()}
            </Grid>
          </div>
        )}
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    articles: state.articles.articles,
    loading: state.articles.loading
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  getArticles: bindActionCreators(getArticles, dispatch),
  updateArticle: bindActionCreators(updateArticle, dispatch)
}, dispatch);

Search.propTypes = {
  loading: PropTypes.bool,
  articles: PropTypes.array.isRequired,
  getArticles: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Search));