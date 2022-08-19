import { useWindowSize } from '@vueuse/core';
import { useElementBounding } from '@vueuse/core';

export const foundItemInArrByValue = (arr, field, value) => {
	const found = arr.find((el) => el[field] === value);
	if (found) {
		return found;
	} else {
		return null;
	}
};

export const errorMessage = (error) => {
	const errorCode = error.code;
	const errorMessage = error.message;
	const err = {
		errorCode,
		errorMessage,
	};
	console.error(err);
	return err;
};

export const windowSize = () => {
	const { width, height } = useWindowSize();
	const windowWidth = width;
	const windowHeight = height;
	return { windowWidth, windowHeight };
};

export const tooltopSize = (tooltip) => {
	const { width, height, left, right } = useElementBounding(tooltip);
	const tooltipWidth = width;
	const tooltipHeight = height;
	const tooltipLeft = left;
	const tooltipRight = right;
	return {
		tooltipWidth,
		tooltipHeight,
		tooltipLeft,
		tooltipRight,
	};
};
export const tooltopTextSize = (tooltipText) => {
	const { width, height, left, right } = useElementBounding(tooltipText);
	const tooltipTextWidth = width;
	const tooltipTextHeight = height;
	const tooltipTextLeft = left;
	const tooltipTextRight = right;
	return {
		tooltipTextWidth,
		tooltipTextHeight,
		tooltipTextLeft,
		tooltipTextRight,
	};
};

export const tryToConvertStringToNumber = (value) => {
	const valueString = String(value);
	const number = Number(valueString);
	const numberedString = String(number);
	if (valueString === numberedString) {
		return number;
	} else {
		return value;
	}
};

export const getFilteredValue = (value) => {
	const restrictedSymbols = /[^0-9.-]/;
	const excessiveDots = /(\..*?)\..*/;
	const comboDotsDash = /-\./;
	const intValues = /^[0-9-]{1}[0-9]*/;

	let filtered = String(value);
	filtered = filtered
		.replace(restrictedSymbols, '')
		.replace(excessiveDots, '$1')
		.replace(comboDotsDash, '-');
	const matched = filtered.match(intValues);
	if (matched) {
		const output = matched[0].split('.');
		filtered = output.shift() + (output.length ? `.${output.join('')}` : '');
	} else {
		filtered = '';
	}

	return filtered;
};

export const isObjext = (item) => {
	if (item instanceof Object) {
		return true;
	}
	return false;
};
