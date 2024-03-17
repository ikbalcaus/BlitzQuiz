import { Box, Input, IconButton } from '@mui/joy';
import { Remove } from '@mui/icons-material';

export default function AnswerInput() {
    return (
        <Box sx={{
            display: "flex",
            gap: 0.5,
            width: "80%",
            mx: "auto",
        }}>
            <Input sx={{
                width: "100%",
                borderTop: 0
            }}
                autoComplete="off"
                placeholder="Enter new answer"
            />
            <IconButton
                color="neutral"
                variant="soft"
            ><Remove /></IconButton>
        </Box>
    )
}
