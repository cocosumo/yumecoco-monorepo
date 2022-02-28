
import MainContainer from '../../../components/ui/containers/MainContainer';
import PageTitle from '../../../components/ui/labels/PageTitle';
import ConstructionInfo from './sections/ConstructionInfo';
import CustInfo from './sections/CustInfo';
import Foot from './sections/foot';
import ConstructionLocation from './sections/location';

const ConstructionRegister  = () => {


  return (
    <MainContainer>
      <PageTitle label="工事情報登録" color="#60498C" textColor='#FFF' />
      <CustInfo/>
      <ConstructionInfo />
      <ConstructionLocation/>
      <Foot/>
    </MainContainer>
  );
};

export default ConstructionRegister;