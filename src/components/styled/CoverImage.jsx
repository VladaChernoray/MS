import styled from "@mui/material/styles/styled";

const CoverImage = styled('div')({
    display: 'block',
    width: 320,
    height: 320,
    objectFit: 'cover',
    overflow: 'hidden',
    flexShrink: 0,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.08)',
    '& > img': {
        width: '100%',
    },
});

export default CoverImage;