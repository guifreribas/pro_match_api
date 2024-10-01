import Card from "#models/cardModel.js";
import Category from "#models/categoryModel.js";
import Competition from "#models/competitionModel.js";
import Field from "#models/fieldModel.js";
import Foul from "#models/foulModel.js";
import Goal from "#models/goalModel.js";
import Match from "#models/matchModel.js";
import Organization from "#models/organizationModel.js";
import Player from "#models/playerModel.js";
import Result from "#models/resultModel.js";
import Team from "#models/teamModel.js";
import TeamPlayer from "#models/teamPlayerModel.js";
import User from "#models/userModel.js";
import CompetitionCategory from "#src/models/competitionCategoryModel.js";
import CompetitionTeam from "#src/models/competitionTeamModel.js";
import CompetitionType from "#src/models/competitionTypeModel.js";
import MatchPlayer from "#src/models/matchPlayerModel.js";
import Standings from "#src/models/standingsModel.js";

export function setupAssociations() {
	// Relacions pel model "Card"
	Card.belongsTo(Match, { foreignKey: "match_id" });
	Card.belongsTo(Player, { foreignKey: "player_id" });
	Card.belongsTo(Team, { foreignKey: "team_id" });
	Card.belongsTo(User, { foreignKey: "user_id" });

	// Relacions pel model "Category"
	Category.belongsTo(Organization, { foreignKey: "organization_id" });
	Category.belongsTo(User, { foreignKey: "user_id" });

	// Relacions pel model "CompetitionCategory"
	CompetitionCategory.belongsTo(Competition, {
		foreignKey: "competition_id",
	});
	CompetitionCategory.belongsTo(Category, { foreignKey: "category_id" });
	CompetitionCategory.belongsTo(User, { foreignKey: "user_id" });
	CompetitionCategory.hasMany(Standings, {
		foreignKey: "competition_category_id",
	});

	// Relacions pel model "Competition"
	Competition.belongsTo(CompetitionType, {
		foreignKey: "competition_type_id",
	});
	Competition.belongsTo(Organization, { foreignKey: "organization_id" });
	Competition.belongsTo(User, { foreignKey: "user_id" });
	Competition.hasOne(CompetitionCategory, { foreignKey: "competition_id" });
	Competition.hasMany(Standings, { foreignKey: "competition_id" });
	Competition.hasMany(Goal, { foreignKey: "competition_id" });

	// Relacions pel model "CompetitionTeam"
	CompetitionTeam.belongsTo(CompetitionCategory, {
		foreignKey: "competition_category_id",
	});
	CompetitionTeam.belongsTo(Team, { foreignKey: "team_id" });

	// Relacions pel model "Field"
	Field.belongsTo(Organization, { foreignKey: "organization_id" });
	Field.belongsTo(User, { foreignKey: "user_id" });

	// Relacions pel model "Foul"
	Foul.belongsTo(Match, { foreignKey: "match_id" });
	Foul.belongsTo(Player, { foreignKey: "player_id" });
	Foul.belongsTo(Team, { foreignKey: "team_id" });

	// Relacions pel model "Goal"
	Goal.belongsTo(Match, { foreignKey: "match_id" });
	Goal.belongsTo(Player, { foreignKey: "player_id" });
	Goal.belongsTo(Team, { foreignKey: "team_id" });
	Goal.belongsTo(User, { foreignKey: "user_id" });
	Goal.belongsTo(Competition, { foreignKey: "competition_id" });

	// Relacions pel model "Match"
	Match.belongsTo(CompetitionCategory, {
		foreignKey: "competition_category_id",
	});
	Match.belongsTo(User, { foreignKey: "user_id" });
	Match.belongsTo(Team, { as: "localTeam", foreignKey: "local_team" });
	Match.belongsTo(Team, { as: "visitorTeam", foreignKey: "visitor_team" });
	Match.hasMany(MatchPlayer, { foreignKey: "match_id" });

	// Relacions pel model "MatchPlayer"
	MatchPlayer.belongsTo(Match, { foreignKey: "match_id" });
	MatchPlayer.belongsTo(Player, { foreignKey: "player_id" });
	MatchPlayer.belongsTo(Team, { foreignKey: "team_id" });
	MatchPlayer.belongsTo(TeamPlayer, { foreignKey: "team_player_id" });

	// Relacions pel model "Organization"
	Organization.belongsTo(User, { foreignKey: "user_id" });

	// Relacions pel model "Player"
	Player.belongsTo(User, { foreignKey: "user_id" });
	Player.hasMany(TeamPlayer, { foreignKey: "player_id" });
	Player.hasMany(MatchPlayer, { foreignKey: "player_id" });

	// Relacions pel model "Result"
	Result.belongsTo(Match, { foreignKey: "match_id" });

	// Relacions pel model "Standings"
	Standings.belongsTo(Team, { foreignKey: "team_id" });
	Standings.belongsTo(User, { foreignKey: "user_id" });
	Standings.belongsTo(Competition, { foreignKey: "competition_id" });
	Standings.belongsTo(CompetitionCategory, {
		foreignKey: "competition_category_id",
	});

	// Relacions pel model "Team"
	Team.belongsTo(User, { foreignKey: "user_id" });
	Team.hasMany(TeamPlayer, { foreignKey: "team_id" });
	Team.hasMany(Match, { foreignKey: "local_team", as: "homeMatches" });
	Team.hasMany(Match, { foreignKey: "visitor_team", as: "awayMatches" });
	Team.hasMany(MatchPlayer, { foreignKey: "team_id" });
	Team.hasMany(Standings, { foreignKey: "team_id" });

	// Relacions pel model "TeamPlayer"
	TeamPlayer.belongsTo(Team, { foreignKey: "team_id" });
	TeamPlayer.belongsTo(Player, { foreignKey: "player_id" });
	TeamPlayer.belongsTo(User, { foreignKey: "user_id" });
	TeamPlayer.hasMany(MatchPlayer, { foreignKey: "team_player_id" });

	// Relacions pel model "User"
	User.hasMany(Organization, { foreignKey: "user_id" });
	User.hasMany(Field, { foreignKey: "user_id" });
	User.hasMany(Player, { foreignKey: "user_id" });
	User.hasMany(TeamPlayer, { foreignKey: "user_id" });
	User.hasMany(Match, { foreignKey: "user_id" });
	User.hasMany(Card, { foreignKey: "user_id" });
	User.hasMany(Standings, { foreignKey: "user_id" });
	User.hasMany(Goal, { foreignKey: "user_id" });
}

// export function setupAssociations() {
//     Card.belongsTo(Match, { foreignKey: "match_id" });
//     Card.belongsTo(Player, { foreignKey: "player_id" });
//     Card.belongsTo(Team, { foreignKey: "team_id" });

//     // Category.belongsTo(Organization, { foreignKey: "organization_id" });
//     Category.belongsTo(User, { foreignKey: "user_id" });
//     Category.belongsTo(Competition, { foreignKey: "competition_id" });

//     // Competition.belongsTo(Organization, { foreignKey: "organization_id" });
//     Competition.belongsTo(User, { foreignKey: "user_id" });
//     Competition.hasMany(Category, { foreignKey: "competition_id" });
//     Competition.hasMany(Field, { foreignKey: "competition_id" });
//     // Competition.hasMany(Organization, { foreignKey: "competition_id" });

//     // Field.belongsTo(Organization, { foreignKey: "organization_id" });
//     Field.belongsTo(Competition, { foreignKey: "competition_id" });
//     Field.belongsTo(User, { foreignKey: "user_id" });

//     Foul.belongsTo(Match, { foreignKey: "match_id" });
//     Foul.belongsTo(Player, { foreignKey: "player_id" });
//     Foul.belongsTo(Team, { foreignKey: "team_id" });

//     Goal.belongsTo(Match, { foreignKey: "match_id" });
//     Goal.belongsTo(Player, { foreignKey: "player_id" });
//     Goal.belongsTo(Team, { foreignKey: "team_id" });

//     Match.belongsTo(Category, { foreignKey: "category_id" });
//     Match.belongsTo(Team, { foreignKey: "local_team" });
//     Match.belongsTo(Team, { foreignKey: "visitor_team" });
//     Match.hasMany(Card, { foreignKey: "match_id" });
//     Match.hasMany(Foul, { foreignKey: "match_id" });
//     Match.hasMany(Goal, { foreignKey: "match_id" });
//     Match.hasMany(Result, { foreignKey: "match_id" });

//     Organization.belongsTo(User, { foreignKey: "user_id" });
//     Organization.hasMany(Field, { foreignKey: "organization_id" });

//     Result.belongsTo(Match, { foreignKey: "match_id" });
//     Match.hasOne(Result, { foreignKey: "result_id" });
//     Match.hasMany(Goal, { foreignKey: "match_id" });

//     Player.belongsTo(User, { foreignKey: "user_id" });
//     Player.hasMany(TeamPlayer, { foreignKey: "player_id" });
//     Player.hasMany(Card, { foreignKey: "player_id" });
//     Player.hasMany(Foul, { foreignKey: "player_id" });
//     Player.hasMany(Goal, { foreignKey: "player_id" });

//     Team.hasMany(TeamPlayer, { foreignKey: "team_player_id" });
//     Team.belongsTo(User, { foreignKey: "user_id" });

//     TeamPlayer.belongsTo(Team, { foreignKey: "team_id" });
//     TeamPlayer.belongsTo(Player, { foreignKey: "player_id" });
//     TeamPlayer.belongsTo(User, { foreignKey: "user_id" });

//     User.hasMany(Category, { foreignKey: "user_id" });
//     User.hasMany(Organization, { foreignKey: "user_id" });
//     User.hasMany(Player, { foreignKey: "user_id" });
//     User.hasMany(Team, { foreignKey: "user_id" });
// }
