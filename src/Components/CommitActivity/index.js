import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import ReactHighcharts from 'react-highcharts';
// import Highcharts from 'highcharts';
import { Select, MenuItem } from '@mui/material';

const CommitActivity = ({ repoFullName }) => {
    const [commitData, setCommitData] = useState([]);
    const [selectedOption, setSelectedOption] = useState('changes'); // Initial value

    useEffect(() => {
        // Fetch commit activity from GitHub API
        axios.get(`https://api.github.com/repos/${repoFullName}/stats/commit_activity`, {
            headers: {
                'User-Agent': 'github-repo-app',
            },
        })
            .then(response => {
                setCommitData(response.data);
            })
            .catch(error => {
                console.error('Error fetching commit activity:', error);
            });
    }, [repoFullName]);

    const handleOptionChange = event => {
        setSelectedOption(event.target.value);
    };

    // Process and manipulate data based on the selected option
    const processedData = commitData.map(week => {
        if (selectedOption === 'additions') {
            return week.additions;
        } else if (selectedOption === 'deletions') {
            return week.deletions;
        } else {
            return week.total;
        }
    });

  

    return (
        <div>
            <h2>Commit Activity</h2>
            <Select value={selectedOption} onChange={handleOptionChange}>
                <MenuItem value="additions">Additions</MenuItem>
                <MenuItem value="deletions">Deletions</MenuItem>
                <MenuItem value="changes">Changes</MenuItem>
            </Select>
        </div>
    );
};

export default CommitActivity;
