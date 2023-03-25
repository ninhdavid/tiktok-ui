import GetVideoForPages from '~/layouts/components/GetVideoForPages';

function Home({ isShowModal, setIsShowModal }) {
	return (
		<GetVideoForPages
			type="for-you"
			isShowModal={isShowModal}
			setIsShowModal={setIsShowModal}
		/>
	);
}

export default Home;
