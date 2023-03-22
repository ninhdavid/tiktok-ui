import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './ToastModal.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function ToastModal({ isDiscard, isShowModal }) {
	const handleDiscard = () => {
		isDiscard();
	};
	return (
		<div className={cx('wrapper')} aria-hidden="true">
			<div className={cx('content')}>
				<div className={cx('toast-section')} aria-modal="true">
					<div className={cx('text-section')}>
						<p>
							<span>Discard this post?</span>
						</p>
						<p>
							<span>The video and all edits will be discarded.</span>
						</p>
					</div>
					<div className={cx('btn-section')}>
						<div className={cx('accept-section')}>
							<Button
								className={cx('accept-btn')}
								primary
								onClick={handleDiscard}
							>
								Discard
							</Button>
						</div>
						<div className={cx('cancel-section')}>
							<Button className={cx('cancel-btn')} border onClick={isShowModal}>
								Continue editing
							</Button>
						</div>
					</div>
				</div>
			</div>
			;
		</div>
	);
}

ToastModal.propTypes = {};

export default ToastModal;
