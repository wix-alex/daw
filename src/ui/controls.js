"use strict";

ui.controls = {
	init() {
		dom.togglePlay.onclick = ui.controls._onclickTogglePlay;
		dom.play.onclick = ui.controls._onclickPlay;
		dom.stop.onclick = ui.controls._onclickStop;
	},
	togglePlay( b ) {
		dom.togglePlay.classList.toggle( "after", !b );
		ui.controls.clock( ( env.togglePlay
			? gs.controls.mainTime
			: gs.controls.patternTime )() );
	},
	play() {
		dom.play.classList.add( "ico-pause" );
	},
	pause() {
		dom.play.classList.remove( "ico-pause" );
	},
	stop() {
		ui.controls.pause();
	},
	bpm( bpm ) {
		dom.bpmNumber.textContent = bpm;
	},
	mainTime( beat ) {
		if ( env.togglePlay ) {
			ui.controls.clock( beat );
		}
		ui.mainGridSamples.currentTime( beat );
	},
	patternTime( beat ) {
		if ( !env.togglePlay ) {
			ui.controls.clock( beat );
		}
		ui.keysGridSamples.currentTime( beat );
	},
	switchClock() {
		ui.controls.clock( ui.controls._beat );
	},
	clock( beat ) {
		ui.controls._beat = beat;
		( env.clockSteps ? ui.controls._clockBeat : ui.controls._clockSec )( beat );
	},
	title( s ) {
		document.title = ( gs.isCompositionNeedSave() ? "*" : "" ) + ( s || "GridSound" );
	},

	// private:
	_clockSec( beat ) {
		beat = beat * 60 / gs.currCmp.bpm;
		dom.clockMin.textContent = common.time.secToMin( beat );
		dom.clockSec.textContent = common.time.secToSec( beat );
		dom.clockMs.textContent  = common.time.secToMs( beat );
	},
	_clockBeat( beat ) {
		dom.clockMin.textContent = common.time.beatToBeat( beat );
		dom.clockSec.textContent = common.time.beatToStep( beat, gs.currCmp.stepsPerBeat );
		dom.clockMs.textContent  = common.time.beatToMStep( beat, gs.currCmp.stepsPerBeat );
	},

	// events:
	_onclickTogglePlay() {
		gs.controls.togglePlay();
	},
	_onclickPlay() {
		gs.controls.status === "playing"
			? gs.controls.pause()
			: gs.controls.play();
	},
	_onclickStop() {
		gs.controls.stop();
	}
};
