describe("Ranking order",function(){
	it("should result in a list where the first player has as many or more points than the second player",function(){
		var ranking = Template.leaderBoard.globaclRanking().fetch();
		expect(ranking[0].score >= ranking[1].score).toBe(true);
	})
});

