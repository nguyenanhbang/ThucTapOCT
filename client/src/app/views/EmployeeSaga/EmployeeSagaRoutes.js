import { EgretLoadable } from 'egret';
import ConstantList from '../../appConfig';
import { withTranslation } from 'react-i18next';
const EmployeeSaga = EgretLoadable({
	loader: () => import('./EmployeeSaga'),
});
const ViewComponent = withTranslation()(EmployeeSaga);

const EmployeeSagaRoutes = [
	{
		path: ConstantList.ROOT_PATH + 'directory/employeeSaga',
		exact: true,
		component: ViewComponent,
	},
];

export default EmployeeSagaRoutes;
