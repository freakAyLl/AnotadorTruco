$(document).ready(function(){
    let team1='',team2='', finalScore=0, score=0, scoreTeam1=0,scoreTeam2=0, winner=''
    $('#24').on('click', function(){finalScore=24});
    $('#30').on('click', function(){finalScore=30});
    $('#alone').on('click',fnRestartGame);
    $('#alone').on('click',fnTeamName);
    $('#left .addButton').on('click', function(){fnScoreAdd(1)})
    $('#right .addButton').on('click', function(){fnScoreAdd(2)})
    $('#leftSubstract').on('click', function(){fnScoreSubstract(1)})
    $('#rigthSubstract').on('click', function(){fnScoreSubstract(2)})
    $('#end').on('click', fnEnd)
    function fnScoreSubstract(n){
        n==1 ? scoreTeam1-=1 : scoreTeam2-=1 
        if(scoreTeam1<=0){scoreTeam1=0}
        if(scoreTeam2<=0){scoreTeam2=0}
        fnUpdateDisplay()
    }
    function fnScoreAdd(n){
        if(winner!=''){return}
        n==1 ? scoreTeam1+=1 : scoreTeam2+=1 
        fnUpdateDisplay()
    }
    function fnUpdateDisplay(){
        $('#diplay1').html(scoreTeam1);
        $('#diplay2').html(scoreTeam2);
        fnUpdateMatches("left",scoreTeam1)
        fnUpdateMatches("right",scoreTeam2)
        if(scoreTeam1==finalScore || scoreTeam2==finalScore ){
            if(scoreTeam1==0 && scoreTeam2==0){return}
            fnshowWinner()}
    }
    function fnshowWinner(){
        scoreTeam1==finalScore ? winner=team1 : winner=team2;
        alert('Ha ganado el jugador '+winner)
    }
    function fnRestartGame(){
        score=0, scoreTeam1=0, scoreTeam2=0;
    }
    function fnTeamName(){
        team1=$('#teamName1').val();
        team2=$('#teamName2').val();
        if(finalScore==0){
            alert('No Pusiste puntaje final')
            return    
        };
        fnScreen2()
    }
    function fnUpdateMatches(str,n){
        let side='.'+str+'Matches', actual=0, selector=1
        for(let i=0;i<=n;i++){
            if(finalScore==24 && selector==11 && actual>2){selector+=5, actual=1}
            if (actual==6){ selector+=5, actual-=5}
            $(side+' .'+selector).attr('src','images/'+actual+'.png')
            actual++
        }
    }
    function fnClearMatches(){
        let selector=1, actual=0
        for(let i=0;i<=30;i++){
            if (actual==6){ selector+=5, actual-=5}
            $('.leftMatches .'+selector).attr('src','images/0.png')
            $('.rightMatches .'+selector).attr('src','images/0.png')
            actual++
        }
    }
    function fnScreen2(){
        $('.firstScreen').css('display','none');
        $('.secondScreen').css('display','flex');
        $('#name1').html(team1);
        $('#name2').html(team2);
        $('.matchLength').html('A '+finalScore);
    }
    function fnEnd(){
        score=0, scoreTeam1=0,scoreTeam2=0, winner=''
        fnUpdateDisplay()
        fnClearMatches()
        finalScore=0
        $('.firstScreen').css('display','flex');
        $('.secondScreen').css('display','none');
    }
});