import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
	typography: {
		fontFamily: 'Roboto, Arial, sans-serif',
		allVariants: {
			color: '#ffffff',
		},
	},
	palette: {
		primary: {
			main: '#342E37', // Color principal
		},
		secondary: {
			main: '#ffb800', // Color secundario
			//main: '#ff5722', // Color secundario
		},
	},
	components: {
		// MuiInput: {
		// 	input: {
		// 		'&::placeholder': {
		// 			color: 'gray',
		// 		},
		// 		color: 'white', // if you also want to change the color of the input, this is the prop you'd use
		// 	},
		// },
		MuiTextField: {
			styleOverrides: {
				root: {
					'& .MuiInputBase-root': {
						color: '#ffffff',
						'&::placeholder': {
							color: '#ffffff',
							opacity: 1,
						},
						secondary: {
							// color: '#000000',
						},
					},
					'& .MuiInputBase-input::placeholder': {
						color: '#ffffff',
						opacity: 1,
					},
					'& .MuiInputLabel-root': {
						color: '#ffffff',
					},
					'& .MuiOutlinedInput-root': {
						'& fieldset': {
							borderColor: '#4caf50',
						},
						'&:hover fieldset': {
							// borderColor: '#ff5722',
							borderColor: '#ff8b00',
						},
						'&.Mui-focused fieldset': {
							borderColor: '#4caf50',
						},
						'&::placeholder': {
							color: '#ffffff',
							opacity: 1,
						},
					},
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					color: '#ffffff',
					borderColor: '#4caf50',
					'&:hover': {
						backgroundColor: '#342E37',
						borderColor: '#342E37',
					},
					'&.Mui-disabled': {
						color: '#aaaaaa',
						borderColor: '#aaaaaa',
					},
				},
				containedPrimary: {
					backgroundColor: '#4caf50',
					color: '#ffffff',
					'&:hover': {
						backgroundColor: '#342E37',
					},
				},
				containedSecondary: {
					backgroundColor: '#ff5722',
					color: '#ffffff',
					'&:hover': {
						backgroundColor: '#e64a19',
					},
				},
				outlinedPrimary: {
					borderColor: '#4caf50',
					'&:hover': {
						borderColor: '#45a049',
					},
				},
				outlinedSecondary: {
					borderColor: '#ff5722',
					'&:hover': {
						borderColor: '#e64a19',
					},
				},
			},
		},
		MuiMenu: {
			styleOverrides: {
				paper: {
					backgroundColor: '#342E37',
				},
			},
		},
		MuiMenuItem: {
			styleOverrides: {
				root: {
					color: '#ffffff',
					'&:hover': {
						backgroundColor: '#3e3e3e',
					},
				},
			},
		},
		MuiTableCell: {
			styleOverrides: {
				root: {
					color: '#ffffff',
					backgroundColor: '#2a2a2a',
					borderBottom: '1px solid #444',
				},
				head: {
					fontWeight: 'bold',
					backgroundColor: '#3a3a3a',
				},
			},
		},
		MuiTableRow: {
			styleOverrides: {
				root: {
					'&:nth-of-type(odd)': {
						backgroundColor: '#1e1e1e',
					},
					'&:hover': {
						backgroundColor: '#333333',
					},
				},
			},
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					backgroundColor: '#1c1c1c',
				},
			},
		},
	},
})
