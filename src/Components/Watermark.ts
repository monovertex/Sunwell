import Card from "../Card";
import {CardType} from "../Enums";
import Sunwell from "../Sunwell";

export default class Watermark {
	private sunwell: Sunwell;
	private parent: Card;

	constructor(sunwell: Sunwell, parent: Card) {
		this.sunwell = sunwell;
		this.parent = parent;
	}

	public assets(): string[] {
		return [this.parent.getWatermarkAsset()];
	}

	public render(context: CanvasRenderingContext2D, ratio: number): void {
		const asset = this.parent.getWatermarkAsset();
		if (!asset) {
			return;
		}

		if (
			this.parent.premium ||
			this.parent.cardDef.type === CardType.MINION ||
			this.parent.cardDef.type === CardType.HERO
		) {
			context.globalCompositeOperation = "multiply";
			context.globalAlpha = 0.6;
		} else if (this.parent.cardDef.type === CardType.SPELL) {
			context.globalCompositeOperation = "multiply";
			context.globalAlpha = 0.7;
		} else if (this.parent.cardDef.type === CardType.WEAPON) {
			context.globalCompositeOperation = "lighten";
			context.globalAlpha = 0.1;
		}

		const coords = this.parent.getWatermarkCoords();
		coords.ratio = ratio;
		this.sunwell.drawImage(context, asset, coords);

		// Reset context
		context.globalCompositeOperation = "source-over";
		context.globalAlpha = 1;
	}
}
