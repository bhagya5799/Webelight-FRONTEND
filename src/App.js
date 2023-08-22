import React from 'react';
import { Container, Grid } from '@mui/material';
import RepoList from './Components/RepoList';
import CommitActivity from './Components/CommitActivity';

const App = () => {
  return (
    <Container>
      <h1>Most Starred GitHub Repositories</h1>
      <Grid container spacing={3}>
        <Grid item xs={12} md={16}>
          <RepoList />
        </Grid>
      </Grid>
    </Container>
  );
};
export default App;
