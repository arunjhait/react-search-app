import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Pagination from '@material-ui/lab/Pagination';

import { getArticles, updateArticle, setPaginationFilters } from '../store/actions';
import Articles from '../components/Articles';
import Skeletons from '../components/Skeletons';

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
    '& svg': {
      fill: theme.palette.secondary.main
    }
  },
  autocomplete: {
    width: '100%'
  },
  pageContainer: {
    width: '100%',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    margin: '0.5rem 0'
  },
  pagination: {
    '& button.Mui-selected': {
      background: theme.palette.secondary.main,
    }
  },
  totalCount: {
    color: theme.palette.secondary.main,
    fontWeight: 600
  }
});

const Search = (props) => {

  const paginatorRef = useRef(null);
  const [search, setSearch] = useState('');
  const [update, setUpdate] = useState(false);

  const { classes, loading, getArticles, articles, pagination, setPaginationFilters } = props;

  const { pageNumber, itemsPerPage, total } = pagination;

  useEffect(() => {
    if (articles && articles.length === 0) {
      getArticles(); // Get the Artilces on intially page render
    }
  });

  

  const getFilterResults = () => {
    const { articles, matching } = filterResults();
    if (articles && articles.length) {
      // create Article
      updatePage(matching && matching.length);
      return articles.map((item) => <Articles onSave={onSave} key={item.id} {...item} />);
    }
  };

  const filterResults = () => {
    const pageStart = (pageNumber - 1) * itemsPerPage;
    const pageEnd = pageStart + itemsPerPage;
    if (!search) return { articles: articles && articles.slice(pageStart, pageEnd), matching: null };

    const filteredPosts = articles && articles
      .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));
    return { articles: filteredPosts.length < pageStart ? filteredPosts : filteredPosts.slice(pageStart, pageEnd), matching: filteredPosts };
  };

  const onSave = (article) => {
    props.updateArticle(article);
    setSearch('');
    setUpdate(parseInt((Math.random() * 10)) % 5); // To update the Autocomplete
  };

  /**
   * Get the value of Autocomplete and store in state to filter
   * @ {string} title
  */
  const handleChange = (title) => {
    setSearch(title.inputProps.value);
  };

  /**
   * Decides if an update to pagination should happen
   * @ {number} matching
   */
  const updatePage = (matching) => {
    const totalP = matching || articles.length;
    const pages = totalP / itemsPerPage;
    const paginator = paginatorRef.current;
    const shouldResetPageNumber = pages < pageNumber;
    if (totalP !== total) {
      // update pagination filters
      setPaginationFilters({
        ...pagination,
        pageNumber: shouldResetPageNumber ? 1 : pageNumber,
        total: totalP,
      });
      // update pagination count
      if (paginator && paginator.count !== pages) {
        paginator.count = pages > 1 ? Math.floor(pages) : 1;
      }
      // update pagination page
      if (shouldResetPageNumber) {
        paginator.page = 1;
      }
    }
  }

  const handlePaginationChange = (e, value) => {
    setPaginationFilters({ ...pagination, pageNumber: value });
    // Scroll top when page gets changed
    window.scrollTo(0, 0);
  };

  const totalCount = () => {
    let count = total;
    if (filterResults().matching != null && !filterResults().matching.length) count = 0;
    return count;
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
                getOptionLabel={(articles) => articles.title || update}
                className={classes.autocomplete}
                key={update}
                freeSolo
                renderInput={(params) => <TextField {...params} onChange={handleChange({ ...params })} label="Enter the Title to Get Result" variant="outlined" data-testid="autocomplete-data-list" />}
              />
            </div>
            {<p align="right" className={classes.totalCount}>{`${totalCount()} Results`}</p>}
            <Grid container justify="center" spacing={2}>
              {getFilterResults() && getFilterResults()}
            </Grid>
            <div className={classes.pageContainer}>
              <Pagination
                innerRef={paginatorRef}
                className={classes.pagination}
                color="primary"
                page={pageNumber}
                align="center"
                count={
                  total / itemsPerPage > 1
                    ? Math.floor(total / itemsPerPage)
                    : 1
                }
                onChange={handlePaginationChange}
                data-testid="pagination-comp"
              />
            </div>
          </div>
        )}
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    articles: state.articles.articles,
    loading: state.articles.loading,
    pagination: state.articles.pagination
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  getArticles: bindActionCreators(getArticles, dispatch),
  updateArticle: bindActionCreators(updateArticle, dispatch),
  setPaginationFilters: (config) => dispatch(setPaginationFilters(config))
}, dispatch);

Search.propTypes = {
  loading: PropTypes.bool,
  articles: PropTypes.array,
  getArticles: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Search));