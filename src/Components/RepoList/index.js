import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import StarBorderIcon from '@mui/icons-material/StarBorder';

import {
    List,
    ListItem,
    Avatar,
    Box,
    Link,
    Typography,
    Pagination,
    Stack,
    Chip,
} from '@mui/material';

const RepoList = () => {
    const [repos, setRepos] = useState([]);
    const [page, setPage] = useState(1);
    const priorDate = moment().subtract(30, 'days').format('YYYY-MM-DD');

    useEffect(() => {
        // Fetch most starred repos from GitHub API
        axios
            .get(
                `https://api.github.com/search/repositories?q=created:>${priorDate}&sort=stars&order=desc&page=${page}`
            )
            .then(response => {
                setRepos(response.data.items);
            })
            .catch(error => {
                console.error('Error fetching repos:', error);
            });
    }, [page]);

    // Function to handle pagination change
    const handlePaginationChange = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <List>
            <Stack spacing={2}>
                <Pagination
                    count={15}
                    size="small"
                    onChange={handlePaginationChange}
                />
            </Stack>
            {repos.map(repo => (
                <ListItem key={repo.id}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                            padding: '1rem',
                            borderRadius: '8px',
                            width: '100%', // Default width for larger screens
                            marginBottom: '20px',
                            '@media (max-width: 668px)': { // Media query for screens <= 668px
                                boxShadow:'none',
                            },
                        }}
                    >
                        <Box
                            sx={{
                                marginRight: '50px',
                                maxWidth: '150px', // Set a maximum width for the left box
                                width: '100%',
                            }}
                        >
                            <Avatar
                                alt={repo.owner.login}
                                src={repo.owner.avatar_url}
                                sx={{ width: 150, height: 150, marginRight: '30px', color: 'red' }}
                            />
                            <Typography
                                variant="body1"
                                sx={{ flex: 1, gap: 4, marginTop: '20px' }}
                            >
                                {`${repo.full_name}`}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: '1',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Typography variant="h5" sx={{ mb: 1 }}>
                                <Link
                                    href={repo.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {repo.name}
                                </Link>
                            </Typography>
                            <Typography variant="body1" color="gray" sx={{ mb: 2 }}>
                                {`${repo.description}`}
                            </Typography>
                            <Chip
                                sx={{ flex: 1, gap: 0, marginRight: '10px' }}
                                variant="outlined"
                                icon={<StarBorderIcon />}
                                label={`Stars: ${repo.stargazers_count}`}
                            />
                            <Chip
                                sx={{ flex: 1, gap: 4 }}
                                variant="outlined"
                                label={` Issues: ${repo.open_issues_count} `}
                            />
                            <Typography
                                variant="body2"
                                sx={{ mb: 4, marginTop: '10px', color: 'gray' }}
                            >
                                Updated {moment(repo.created_at).fromNow()}
                            </Typography>
                        </Box>
                    </Box>
                </ListItem>
            ))}
        </List>
    );
};

export default RepoList;
