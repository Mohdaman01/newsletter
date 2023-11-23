import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from '@mui/material';
import imgPlaceholder from '../assets/5204684_2665818.svg';

export default function NewNewsCard({ news }) {
    return (
        <Card sx={{ maxWidth: 800, margin: '2rem' }}>
            <CardMedia
                component="img"
                alt="Img"
                style={{
                    height: '45vh',
                }}
                image={news.urlToImage || imgPlaceholder}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {news.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {news.content}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small"><Link href={news.url} target="_blank" style={{textDecoration: 'none'}} >Learn More</Link></Button>
            </CardActions>
        </Card>
    );
}
