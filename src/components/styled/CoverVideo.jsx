import styled from "@mui/material/styles/styled";

const CoverVideo = styled('div')({
    position: 'relative',
    display: 'flex',
    objectFit: 'cover',
    overflow: 'hidden',
    zIndex: 1000,
    flexShrink: 0,
    borderRadius: 20,
    '& > video': {
        width: '100%',
    },
});

export default CoverVideo;