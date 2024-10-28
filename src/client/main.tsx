import React from 'react'
import ReactDOM from 'react-dom/client'
import CharacterSheet from './components/CharacterSheet'
import 'antd/dist/reset.css' // Add Ant Design's default styles
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<CharacterSheet />
	</React.StrictMode>
)