import React from 'react';

const ItemMenu = ({ onClick, cadastro }) => (
	<li key={cadastro.Nome}	onClick={onClick}>
		{cadastro.Nome}
	</li>
)

export default ItemMenu;
