import React, { createRef, useEffect } from 'react';
import { WheelCanvasStyle } from './styles';
import { clamp, getQuantity } from '../../utils';
var drawRadialBorder = function (ctx, centerX, centerY, insideRadius, outsideRadius, angle) {
    ctx.beginPath();
    ctx.moveTo(centerX + (insideRadius + 1) * Math.cos(angle), centerY + (insideRadius + 1) * Math.sin(angle));
    ctx.lineTo(centerX + (outsideRadius - 1) * Math.cos(angle), centerY + (outsideRadius - 1) * Math.sin(angle));
    ctx.closePath();
    ctx.stroke();
};
var drawWheel = function (canvasRef, data, drawWheelProps) {
    var _a, _b, _c, _d, _e, _f, _g;
    /* eslint-disable prefer-const */
    var outerBorderColor = drawWheelProps.outerBorderColor, outerBorderWidth = drawWheelProps.outerBorderWidth, innerRadius = drawWheelProps.innerRadius, innerBorderColor = drawWheelProps.innerBorderColor, innerBorderWidth = drawWheelProps.innerBorderWidth, radiusLineColor = drawWheelProps.radiusLineColor, radiusLineWidth = drawWheelProps.radiusLineWidth, fontFamily = drawWheelProps.fontFamily, fontWeight = drawWheelProps.fontWeight, fontSize = drawWheelProps.fontSize, fontStyle = drawWheelProps.fontStyle, perpendicularText = drawWheelProps.perpendicularText, prizeMap = drawWheelProps.prizeMap, textDistance = drawWheelProps.textDistance, currentPrize = drawWheelProps.currentPrize;
    var QUANTITY = getQuantity(prizeMap);
    outerBorderWidth *= 2;
    innerBorderWidth *= 2;
    radiusLineWidth *= 2;
    var canvas = canvasRef.current;
    if (canvas === null || canvas === void 0 ? void 0 : canvas.getContext('2d')) {
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, 500, 500);
        ctx.strokeStyle = 'transparent';
        ctx.lineWidth = 0;
        var startAngle = 0;
        var outsideRadius = canvas.width / 2 - 10;
        var clampedContentDistance = clamp(0, 100, textDistance);
        var contentRadius = (outsideRadius * clampedContentDistance) / 100;
        var clampedInsideRadius = clamp(0, 100, innerRadius);
        var insideRadius = (outsideRadius * clampedInsideRadius) / 100;
        var centerX = canvas.width / 2;
        var centerY = canvas.height / 2;
        for (var i = 0; i < data.length; i++) {
            var _h = data[i], optionSize = _h.optionSize, style = _h.style;
            var arc = (optionSize && (optionSize * (2 * Math.PI)) / QUANTITY) ||
                (2 * Math.PI) / QUANTITY;
            var endAngle = startAngle + arc;
            var grd = ctx.createRadialGradient(centerX, centerY, outsideRadius, // Inner radius (center)
            centerX, centerY, insideRadius // Outer radius
            );
            if (currentPrize !== null && i === currentPrize) {
                grd.addColorStop(0, '#03A000');
                grd.addColorStop(1, '#DAFFCD');
            }
            else {
                grd.addColorStop(0, (style && ((_a = style.backgroundColorsGradient) === null || _a === void 0 ? void 0 : _a[0])));
                grd.addColorStop(1, (style && ((_b = style.backgroundColorsGradient) === null || _b === void 0 ? void 0 : _b[1])));
            }
            ctx.fillStyle = grd;
            // ctx.fillStyle = (style && style.backgroundColor) as string;
            ctx.beginPath();
            ctx.arc(centerX, centerY, outsideRadius, startAngle, endAngle, false);
            ctx.arc(centerX, centerY, insideRadius, endAngle, startAngle, true);
            ctx.stroke();
            ctx.fill();
            ctx.save();
            if (currentPrize !== null && i !== currentPrize) {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
                ctx.beginPath();
                ctx.arc(centerX, centerY, outsideRadius, startAngle, endAngle, false);
                ctx.arc(centerX, centerY, insideRadius, endAngle, startAngle, true);
                ctx.stroke();
                ctx.fill();
                ctx.save();
            }
            // WHEEL RADIUS LINES
            ctx.strokeStyle = radiusLineWidth <= 0 ? 'transparent' : radiusLineColor;
            ctx.lineWidth = radiusLineWidth;
            drawRadialBorder(ctx, centerX, centerY, insideRadius, outsideRadius, startAngle);
            if (i === data.length - 1) {
                drawRadialBorder(ctx, centerX, centerY, insideRadius, outsideRadius, endAngle);
            }
            // WHEEL OUTER BORDER
            ctx.strokeStyle =
                outerBorderWidth <= 0 ? 'transparent' : outerBorderColor;
            ctx.lineWidth = outerBorderWidth;
            ctx.beginPath();
            ctx.arc(centerX, centerY, outsideRadius - ctx.lineWidth / 2, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();
            // WHEEL INNER BORDER
            ctx.strokeStyle =
                innerBorderWidth <= 0 ? 'transparent' : innerBorderColor;
            ctx.lineWidth = innerBorderWidth;
            ctx.beginPath();
            ctx.arc(centerX, centerY, insideRadius + ctx.lineWidth / 2 - 1, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();
            // CONTENT FILL
            ctx.translate(centerX + Math.cos(startAngle + arc / 2) * contentRadius, centerY + Math.sin(startAngle + arc / 2) * contentRadius);
            var contentRotationAngle = startAngle + arc / 2;
            if (data[i].image) {
                // CASE IMAGE
                contentRotationAngle +=
                    data[i].image && !((_c = data[i].image) === null || _c === void 0 ? void 0 : _c.landscape) ? Math.PI / 2 : 0;
                ctx.rotate(contentRotationAngle);
                var img = ((_d = data[i].image) === null || _d === void 0 ? void 0 : _d._imageHTML) || new Image();
                if (currentPrize !== null && i !== currentPrize) {
                    ctx.globalAlpha = 0.5;
                }
                ctx.drawImage(img, (img.width + (((_e = data[i].image) === null || _e === void 0 ? void 0 : _e.offsetX) || 0)) / -2, -(img.height -
                    (((_f = data[i].image) === null || _f === void 0 ? void 0 : _f.landscape) ? 0 : 90) + // offsetY correction for non landscape images
                    (((_g = data[i].image) === null || _g === void 0 ? void 0 : _g.offsetY) || 0)) / 2, img.width, img.height);
            }
            else {
                // CASE TEXT
                contentRotationAngle += perpendicularText ? Math.PI / 2 : 0;
                ctx.rotate(contentRotationAngle);
                var text = data[i].option;
                ctx.font = "".concat((style === null || style === void 0 ? void 0 : style.fontStyle) || fontStyle, " ").concat((style === null || style === void 0 ? void 0 : style.fontWeight) || fontWeight, " ").concat(((style === null || style === void 0 ? void 0 : style.fontSize) || fontSize) * 2, "px ").concat((style === null || style === void 0 ? void 0 : style.fontFamily) || fontFamily, ", Helvetica, Arial");
                ctx.fillStyle = (style && style.textColor);
                ctx.fillText(text || '', -ctx.measureText(text || '').width / 2, fontSize / 2.7);
            }
            ctx.restore();
            startAngle = endAngle;
        }
    }
};
var WheelCanvas = function (_a) {
    var width = _a.width, height = _a.height, data = _a.data, outerBorderColor = _a.outerBorderColor, outerBorderWidth = _a.outerBorderWidth, innerRadius = _a.innerRadius, innerBorderColor = _a.innerBorderColor, innerBorderWidth = _a.innerBorderWidth, radiusLineColor = _a.radiusLineColor, radiusLineWidth = _a.radiusLineWidth, fontFamily = _a.fontFamily, fontWeight = _a.fontWeight, fontSize = _a.fontSize, fontStyle = _a.fontStyle, perpendicularText = _a.perpendicularText, prizeMap = _a.prizeMap, rouletteUpdater = _a.rouletteUpdater, textDistance = _a.textDistance, currentPrize = _a.currentPrize;
    var canvasRef = createRef();
    var drawWheelProps = {
        outerBorderColor: outerBorderColor,
        outerBorderWidth: outerBorderWidth,
        innerRadius: innerRadius,
        innerBorderColor: innerBorderColor,
        innerBorderWidth: innerBorderWidth,
        radiusLineColor: radiusLineColor,
        radiusLineWidth: radiusLineWidth,
        fontFamily: fontFamily,
        fontWeight: fontWeight,
        fontSize: fontSize,
        fontStyle: fontStyle,
        perpendicularText: perpendicularText,
        prizeMap: prizeMap,
        rouletteUpdater: rouletteUpdater,
        textDistance: textDistance,
        currentPrize: currentPrize,
    };
    useEffect(function () {
        drawWheel(canvasRef, data, drawWheelProps);
    }, [
        canvasRef,
        data,
        drawWheelProps,
        rouletteUpdater,
        drawWheelProps.currentPrize,
    ]);
    return React.createElement(WheelCanvasStyle, { ref: canvasRef, width: width, height: height });
};
export default WheelCanvas;
